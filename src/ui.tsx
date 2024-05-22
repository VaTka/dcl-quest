import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import * as npc from 'dcl-npc-toolkit'
import { uiQuestList } from './questUi'

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
    {uiQuestList()}
    <npc.NpcUtilsUi />
  </UiEntity>

)
