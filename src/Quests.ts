import { Entity, pointerEventsSystem, InputAction, engine, MeshCollider, MeshRenderer, Transform } from "@dcl/sdk/ecs"
import { Cube } from "./components"

export class QuestClicker {
    private chapterClicks = 0
    private currentChapter = 0
    private amountClicksByChapter: Array<number> = []
    private resolveReady!: () => void
    private questDone: Promise<void>
    private entitys: Array<Entity>

    constructor() {
        this.questDone = new Promise((res) => { this.resolveReady = res })
        this.entitys = []
    }

    public async startQuest(amountClicksByChapter: Array<number>, entitysDetail: any) {
        this.entitys = this.createEntity(entitysDetail)
        this.amountClicksByChapter = amountClicksByChapter
        this.currentChapter = 0
        this.chapterClicks = 0
        this.entitys.forEach(entity => { this.attachClickEvent(entity) })
        await this.questDone
        this.questDone = new Promise(r => this.resolveReady = r)
    }

    private createEntity(position: any) {
        let entitys: Array<Entity> = []
        position.forEach((coordinates: Array<number>) => {
            const entity = engine.addEntity()
            Cube.create(entity)
            Transform.create(entity, { position: { x: coordinates[0], y: coordinates[1], z: coordinates[2] } })
            MeshRenderer.setBox(entity)
            MeshCollider.setBox(entity)
            entitys.push(entity)
        })
        return entitys
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
            if (this.currentChapter >= this.amountClicksByChapter.length) {
                this.endQuest()
            }
        }
    }

    private endQuest() {
        console.log('WIN');
        this.entitys.forEach(entity => {
            pointerEventsSystem.removeOnPointerDown(entity)
            engine.removeEntity(entity)
        })
        this.resolveReady()
    }
}