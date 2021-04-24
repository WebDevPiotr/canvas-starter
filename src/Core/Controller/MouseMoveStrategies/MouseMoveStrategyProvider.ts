
import ControllerModeType from '../ControllerModeType'
import IMouseMoveStrategy from './IMouseMoveStrategy'
import MoveStartegy from './Strategies/MoveStrategy'
import RotationStrategy from './Strategies/RotationStrategy'
import ResizeStrategy from './Strategies/ResizeStrategy'
import MarkingStrategy from './Strategies/MarkingStartegy'
import PanningStrategy from './Strategies/PanningStrategy'
class MouseMoveStrategyProvider {

    static get(mode: ControllerModeType): IMouseMoveStrategy {
        switch (mode) {
            case ControllerModeType.MARKING:
                return new MarkingStrategy()
            case ControllerModeType.MOVING:
            case ControllerModeType.SELECTED:
                return new MoveStartegy()
            case ControllerModeType.ROTATING:
                return new RotationStrategy()
            case ControllerModeType.RESIZING_T:
            case ControllerModeType.RESIZING_TL:
            case ControllerModeType.RESIZING_TR:
            case ControllerModeType.RESIZING_L:
            case ControllerModeType.RESIZING_R:
            case ControllerModeType.RESIZING_B:
            case ControllerModeType.RESIZING_BL:
            case ControllerModeType.RESIZING_BR:
                return new ResizeStrategy()
            case ControllerModeType.PANNING:
                return new PanningStrategy()
        }
    }
}

export default MouseMoveStrategyProvider