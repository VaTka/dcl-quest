import { Entity, pointerEventsSystem, InputAction, engine } from "@dcl/sdk/ecs"

export let uiClickCounter = 0
export let uiText = ''

export class QuestClicker {
    private chapterClicks = 0
    private currentChapter = 0
    private amountClicksByChapter: Array<number> = []
    private entitysDetail: Array<Entity>
    private text: Array<string>
    private resolveReady!: () => void
    private questDone: Promise<void>

    constructor(amountClicksByChapter: Array<number>, entitysDetail: any, text: Array<string>) {
        this.text = text
        this.entitysDetail = entitysDetail
        this.amountClicksByChapter = amountClicksByChapter
        this.questDone = new Promise((res) => { this.resolveReady = res })
    }

    public async startQuest() {
        uiClickCounter = this.amountClicksByChapter[this.currentChapter]
        uiText = `${this.text[this.currentChapter]}: ${uiClickCounter | 0}`
        this.entitysDetail.forEach(entity => { 
            this.attachClickEvent(entity) 
        })
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
                uiClickCounter--
                uiText = `${this.text[this.currentChapter]}: ${uiClickCounter | 0}`
                pointerEventsSystem.removeOnPointerDown(entity)
                this.handleClick()
            }
        )
    }

    private handleClick() {
        this.chapterClicks++
        console.log(`Cube clicked ${this.chapterClicks} times in chapter ${this.currentChapter + 1}`)
        if (this.chapterClicks >= this.amountClicksByChapter[this.currentChapter]) {
            this.currentChapter++
            this.chapterClicks = 0
            console.log('You end chapter ', this.currentChapter)
            uiClickCounter = this.amountClicksByChapter[this.currentChapter]
            uiText = `${this.text[this.currentChapter]}: ${uiClickCounter | 0}`
            if (this.currentChapter >= this.amountClicksByChapter.length) this.endQuest()
        }
    }

    private endQuest() {
        console.log('WIN');
        this.entitysDetail.forEach(entity => {
            pointerEventsSystem.removeOnPointerDown(entity)
            engine.removeEntity(entity)
        })
        this.resolveReady()
    }
}