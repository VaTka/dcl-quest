import { Entity, engine, Transform, MeshRenderer, MeshCollider } from "@dcl/sdk/ecs"
import { Cube } from "./components"

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