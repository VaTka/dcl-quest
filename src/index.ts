import { MeshCollider, engine } from '@dcl/sdk/ecs'
import { changeColorSystem, circularSystem } from './systems'
import { setupUi } from './ui'
import { QuestClicker } from './Quests'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as npc from 'dcl-npc-toolkit'
import { Dialog } from 'dcl-npc-toolkit'

const entityCords = [[1,1,1], [4,1,1], [7,1,1], [10,1,1], [13,1,1]]

export let dialog: Dialog[] = [
  {
    "text": "I'm going to check the date and time now! ... uhm  (mumbling) This can't be! Oh no! It seems I forgot to set my internal clock!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true,
    "triggeredByNext": async () => {
			const myQuest = new QuestClicker()
      await myQuest.startQuest([3], entityCords)
		},
  }
]

export async function main() {
  // Defining behavior. See `src/systems.ts` file.
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
        npc.talk(myNPC, dialog, 0)
      },
      onlyClickTrigger: true,
    }
  )
  
  MeshCollider.setBox(myNPC)
  setupUi()
  
  // await myQuest.startQuest([1], entitysTestOne)
  // await myQuest.startQuest([1], entitysTestOne_2)
}
