// import { pointerEventsSystem, InputAction, Transform } from "@dcl/sdk/ecs"
// import { myQuest } from "."
// let clicks = 0

// export function setupClickEntity(clicksByChapter: Array<number>, entity: any) {
//     let chapterClicks = 0
//     clicksByChapter.forEach(clicks => {
//        pointerEventsSystem.onPointerDown(
//         {
//           entity,
//           opts: {
//             button: InputAction.IA_POINTER,
//             hoverText: 'Click',
//           },
//         },
//         () => {
//           chapterClicks++
//           console.log(`Cube clicked ${chapterClicks} times`)
//           if (chapterClicks == clicks) {
//             myQuest.endQuest()
//           }
//         }
//       )
//     })
//   }