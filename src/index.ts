import { MeshCollider, engine } from '@dcl/sdk/ecs'
import { changeColorSystem, circularSystem } from './systems'
import { setupUi } from './ui'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as npc from 'dcl-npc-toolkit'
import { JsonTs, pointer } from './day_1'
import { QuestClicker } from './Quests'
import { createEntity } from './createEntity'

export const bucket = () => {
  const entity = createEntity([[3,1,5]])
  const myQuest = new QuestClicker(1, entity, "Addition req\n fill the bucket", () => {})
  return myQuest.startQuest()
}

export async function main() {
  engine.addSystem(circularSystem)
  engine.addSystem(changeColorSystem)
  let myNPC = npc.create(
    {
      position: Vector3.create(8, 0, 8),
      rotation: Quaternion.Zero(),
      scale: Vector3.create(1, 1, 1),
    },
    {
      type: npc.NPCType.CUSTOM,
      model: 'images/capsule.glb',
      onActivate: () => {
        npc.talk(myNPC, JsonTs, pointer)
      },
      onlyClickTrigger: true,
    }
  )
  MeshCollider.setBox(myNPC)
  setupUi()
}
