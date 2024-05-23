import { Entity, pointerEventsSystem, InputAction, engine } from "@dcl/sdk/ecs"
import { setUiQuestText } from "./questHandler"

export class QuestClicker {
    private clickCounter = 0
    private entities: Array<Entity>
    private text: string
    private afterClick: Function
    private endOfQuest: Function | undefined
    private resolveReady!: () => void
    private questDone: Promise<void>
    private resourceClicks = 0
    private resourceAmount = 0
    private reqStatus = false
    private reqCallback: Function | undefined

    constructor(amountClicks: number, entities: Array<Entity>, text: string, afterClick: Function, endOfQuest?: Function) {
        this.clickCounter = amountClicks
        this.entities = entities
        this.text = text
        this.afterClick = afterClick
        this.endOfQuest = endOfQuest
        this.questDone = new Promise((res) => { this.resolveReady = res })
    }

    private async additionalReq(reqCallback: any) {
        this.reqStatus = await reqCallback()
        setUiQuestText(`${this.text}: ${this.clickCounter | 0}`)
        this.resourceClicks = this.resourceAmount
    }

    public async startQuest(reqParameter?: { resourceAmount: number, reqCallback: any }) {
        if (reqParameter) {
            this.resourceAmount = reqParameter.resourceAmount
            this.resourceClicks = reqParameter.resourceAmount
            this.reqCallback = reqParameter.reqCallback
            if (reqParameter.resourceAmount != 0) await this.additionalReq(this.reqCallback)
        }
        setUiQuestText(`${this.text}: ${this.clickCounter | 0}`)
        this.entities.forEach(entity => this.attachClickEvent(entity))
        await this.questDone
        this.questDone = new Promise(r => this.resolveReady = r)
        return true
    }

    private attachClickEvent(entity: Entity) {
        pointerEventsSystem.onPointerDown(
            {
                entity,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: 'Click',
                },
            },
            () => {
                if (this.reqStatus && this.resourceClicks <= 0) {
                    this.additionalReq(this.reqCallback)
                    return
                }
                this.clickCounter--
                this.resourceClicks--
                this.afterClick()
                setUiQuestText(`${this.text}: ${this.clickCounter | 0}`)
                if (this.clickCounter <= 0) this.endQuest()
                pointerEventsSystem.removeOnPointerDown(entity)
                //
                // Needed to update the button and ui without overlaps
                // Temporarily, until I understand how it can be done better
                //
                if (this.reqStatus && this.resourceClicks <= 0) {
                    this.additionalReq(this.reqCallback)
                    return
                }
            }
        )
    }

    private endQuest() {
        console.log('END OF QUEST');
        this.entities.forEach(entity => {
            pointerEventsSystem.removeOnPointerDown(entity)
            engine.removeEntity(entity)
        })
        this.endOfQuest?.()
        this.resolveReady()
    }
}