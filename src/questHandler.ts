import { Entity, MeshCollider, MeshRenderer, Transform, engine } from "@dcl/sdk/ecs"
import { QuestClicker } from "./Quests"
import { Cube } from "./components"

export let questInputVisible = false
export let uiInputText: string = ''
export let uiText = ''

let questInputValue: any
let resolveReady!: any

export const createEntity = (position: Array<Array<number>>) => {
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

export const bucket = () => {
    let backetEntities = createEntity([[3, 1, 5]])
    const myQuest = new QuestClicker(1, backetEntities, "Addition req\n fill the bucket", () => { });
    return myQuest.startQuest()
}

export const setQuestInputValue = (value: any) => {
    questInputValue = value
    resolveReady()
}

export const getQuestInputValue = async (text: string = '') => {
    uiInputText = text
    questInputVisible = true
    let dataCome = new Promise((res) => { resolveReady = res })
    await dataCome
    questInputVisible = false
    return questInputValue
}

export const setUiQuestText = (value: string) => {
    uiText = value
}
