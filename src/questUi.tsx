import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { questUiVisible } from "./day_1";
import { uiText } from "./Quests";

export const uiQuestList = () => (
    <UiEntity
        uiTransform={{
            width: 'auto',
            height: 300,
            margin: { top: '25%', left: '10' },
            alignItems: 'flex-start',
            display: questUiVisible ? 'flex': 'none'
        }}
        uiText={{ value: uiText, fontSize: 18 }}
        uiBackground={{ color: Color4.Red() }}
    />
)