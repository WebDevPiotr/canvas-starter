
import ControllerModeType from '../ControllerModeType'
import IMouseUpStrategy from './IMouseUpStrategy'
import BackToSelectStrategy from './Strategies/BackToSelectStrategy'
import EndMarkingStrategy from './Strategies/EndMarkingStrategy'

class MouseUpStrategyProvider {

    static get(mode: ControllerModeType): IMouseUpStrategy {
        switch (mode) {
            case ControllerModeType.SELECTED:
            case ControllerModeType.MOVING:
            case ControllerModeType.ROTATING:
            case ControllerModeType.RESIZING_T:
            case ControllerModeType.RESIZING_TL:
            case ControllerModeType.RESIZING_TR:
            case ControllerModeType.RESIZING_L:
            case ControllerModeType.RESIZING_R:
            case ControllerModeType.RESIZING_B:
            case ControllerModeType.RESIZING_BL:
            case ControllerModeType.RESIZING_BR:
                return new BackToSelectStrategy()
            case ControllerModeType.MARKING:
                return new EndMarkingStrategy()
        }
    }
}

export default MouseUpStrategyProvider