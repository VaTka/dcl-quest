import { Entity, pointerEventsSystem, InputAction, engine } from "@dcl/sdk/ecs"
import { bucket } from "."

export let uiText = ''

export class QuestClicker {
    private clickCounter = 0
    private entitys: Array<Entity>
    private text: string
    private afterClick: Function
    private endOfQuest: Function | undefined
    private resolveReady!: () => void
    private questDone: Promise<void>
    private resourseClicks = 0
    private resourceAmount = 0
    private reqStatus = false

    constructor(amountClicks: number, entitys: any, text: string, afterClick: Function, endOfQuest?: Function) {
        this.clickCounter = amountClicks
        this.entitys = entitys
        this.text = text
        this.afterClick = afterClick
        this.endOfQuest = endOfQuest
        this.questDone = new Promise((res) => { this.resolveReady = res })
    }

    private async additionReq() {
        this.reqStatus = await bucket()
        uiText = `${this.text}: ${this.clickCounter | 0}`
        this.resourseClicks = this.resourceAmount
    }

    public async startQuest(resourceAmount: number = 0) {
        this.resourceAmount = resourceAmount
        this.resourseClicks = resourceAmount
        if (resourceAmount != 0) await this.additionReq()
        uiText = `${this.text}: ${this.clickCounter | 0}`
        this.entitys.forEach(entity => this.attachClickEvent(entity))
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
                if (this.reqStatus && this.resourseClicks <= 0) {
                    this.additionReq()
                    return
                }
                this.clickCounter--
                this.resourseClicks--
                this.afterClick()
                uiText = `${this.text}: ${this.clickCounter | 0}`
                if (this.clickCounter <= 0) this.endQuest()
                pointerEventsSystem.removeOnPointerDown(entity)
                //
                // Needed to update the button and ui without overlaps
                // Temporarily, until I understand how it can be done better
                //
                if (this.reqStatus && this.resourseClicks <= 0) {
                    this.additionReq()
                    return
                }
            }
        )
    }

    private endQuest() {
        console.log('END OF QUEST');
        this.entitys.forEach(entity => {
            pointerEventsSystem.removeOnPointerDown(entity)
            engine.removeEntity(entity)
        })
        this.endOfQuest?.()
        this.resolveReady()
    }
}