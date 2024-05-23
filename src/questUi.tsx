import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Input, UiEntity } from "@dcl/sdk/react-ecs";
import { questUiVisible } from "./day_1";
import { questInputVisible, setQuestInputValue, uiInputText, uiText } from "./questHandler";

export const uiQuestList = () => (
    <UiEntity
        uiTransform={{
            width: 'auto',
            height: 300,
            margin: { top: '25%', left: '10' },
            alignItems: 'flex-start',
            display: questUiVisible ? 'flex' : 'none'
        }}
        uiText={{ value: uiText, fontSize: 18 }}
        uiBackground={{ color: Color4.Red() }}
    />
)

export const uiQuestInput = () => (
    <UiEntity
        uiTransform={{
            positionType: 'absolute',
            width: '100%',
            height: '100%',
            display: questInputVisible ? 'flex' : 'none',
            // display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <UiEntity
            uiTransform={{
                height: "auto",
                padding: 20,
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
            }}
            uiText={{ value: uiInputText, fontSize: 18 }}
            uiBackground={{
                color: Color4.Green(),
            }}
        >
            <Input
                onSubmit={(value) => {
                    setQuestInputValue(value)
                }}
                fontSize={18}
                placeholder={'type something'}
                placeholderColor={Color4.Black()}
                uiTransform={{
                    width: '300px',
                    height: '50px',
                }}
            ></Input>
        </UiEntity>
    </UiEntity>
)