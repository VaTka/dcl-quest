import ReactEcs, { Input, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import * as npc from 'dcl-npc-toolkit'
import { uiQuestInput, uiQuestList } from './questUi'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: '100%',
      height: '100%',
    }}
  >
    {uiQuestInput()}
    {uiQuestList()}
    <npc.NpcUtilsUi />
  </UiEntity>

)
