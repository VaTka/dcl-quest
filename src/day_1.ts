import { QuestClicker } from "./Quests"
import { createEntity } from "./createEntity"

export let pointer = 0
export let questUiVisible = false
export const JsonTs = [
  {
    "text": "Welcome to the DAO Decentraland location! But it seems you've arrived a bit early; the official opening hasn't happened yet!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "I'm going to check the date and time now! ... uhm  (mumbling) This can't be! Oh no! It seems I forgot to set my internal clock!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "I was supposed to finish some preparations so everything would be perfect for the opening!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Please help me finish up the last preparations! There are a few tasks I didn't manage to complete.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "While you're here, let's start with the most difficult task! You know, I'm very talented, but I haven't mastered working with plants yet. Follow me - I'll show you where it is.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "A luxurious garden, isn't it? Of course, I'd prefer a rock garden - they require less maintenance. So, let's not waste any time - let's get to work!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Did I not tell you? After landing on the moon, my memory fails me! We need to plant the remaining trees! Explore this showroom and look for seeds under other trees!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Find any empty holes in the garden and toss a seed in! Don't be surprised - those meta trees grow so fast!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "While you work, I'll wait for you here! Don't worry, I'll also be busy - I'll try to unravel the mystery of nature!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true,
    "triggeredByNext": async () => {
      const entityCords = createEntity([[1, 1, 1], [4, 1, 1], [7, 1, 1], [10, 1, 1], [13, 1, 1]])
      const text = ["My first day\n Need to collect seeds", "My first day\n Plant trees"]
      const myQuest = new QuestClicker([3, 2], entityCords, text)
      questUiVisible = true
      pointer = 9
      await myQuest.startQuest().then(() => {
        questUiVisible = false
        pointer = 12
      });
    },
  },
  {
    "text": "To find the seeds, run to the end of this garden, and you'll see boxes of seeds in the square.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Next to this area, there's another small garden - check it too. There were definitely spots for planting trees there.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Just run up to the hole and toss a seed in - Mother Nature (and a pre-written script) will take care of the rest!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true
  },
  {
    "text": "I welcome you to the DAO Decentralend location! I apologize, but the official opening has not yet taken place!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Haha!! I can't believe you fell for it! 1 - 0 score in my favor! Of course, I remember you! My microchips are still intact! ...oh",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Yeah, we're a great team! We've worked so well together! If we're done here, let's go to the next point.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "All these buildings and mechanisms - including this little robot - consume a lot of energy! We're lucky that energy crystals are easily found in this area!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Collect 10 crystals and bring them to this robot! He knows what to do with them!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Just don't tell him where you found the crystals \u2013 this little robot is a terrible sweet tooth!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true,
    "triggeredByNext": async () => {
      const entityCords = createEntity([[1, 1, 8], [1, 1, 5]])
      const myQuest = new QuestClicker([1, 1], entityCords, ['My first day\n test', 'My first day\n test2'])
      questUiVisible = true
      pointer = 18
      await myQuest.startQuest().then(() => {
        questUiVisible = false
        pointer = 19
      });
    }
  },
  {
    "text": "In the energy zone, you can find many crystals - collect them and bring them to the robot.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true
  },
  {
    "text": "I see you've finished already! Thank you, one task less. But I still need your help! Follow me!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Teleports - the greatest invention! Wouldn't you agree? The space base here lets you reach any capsule on the upper level! No more stairs! But first, there's something we need to do...",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Like any complex technology, require regular checks and maintenance. Imagine what could happen if a teleport malfunctioned! That's why we're going to check all the teleports ourselves. You need to run to each teleport and press the automatic system check button. If everything's fine, a green light will come on. Some have already been checked, but some haven't - stay alert!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true
  },
  {
    "text": "According to my database, not all teleports have been checked yet. You need to visit each one and make sure the green button is lit. We mustn't miss anything - this is important!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true
  },
  {
    "text": "Excellent! The transportation system has been fully tested and is ready to welcome visitors! Once again, you've done an outstanding job! I have one final task for you today! I hope you'll enjoy it!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Welcome to the place where streams of information and metaverse magic intertwine! Look, at the heart of it stands the Data Tree - you'll learn more about it in time. But for now, let's get to work!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false
  },
  {
    "text": "Technology and nature complement each other, and we need the mechanical fireflies to do their job. I've activated one, and your task is to find and activate the others. Don't wander too far - they're all within this zone.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true
  },
  {
    "text": "I see that not all the fireflies are in their places. Please check everything in this area carefully. The fireflies are usually on small plants. Just approach them and activate them.",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true
  },
  {
    "text": "What a stunning sight! You should be proud - everything is ready now! Thank you! We've completed the main tasks for today, but promise you'll come back. We have a few more tasks we'll move to tomorrow!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": true
  }
]