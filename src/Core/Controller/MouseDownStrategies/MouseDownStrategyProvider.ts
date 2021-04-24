
import CanvasElementsTypes from 'CanvasObjects/types'
import { Intersection } from 'Core/types'
import IMouseDownStrategy from './IMouseDownStrategy'
import SelectStartegy from './Strategies/SelectStrategy'
import UnselectStartegy from './Strategies/DeselectStrategy'
import RotationStrategy from './Strategies/RotationStrategy'
import ResizeStrategy from './Strategies/ResizeStrategy'
import ControllerModeType from '../ControllerModeType'
import MarkingStrategy from './Strategies/MarkingStrategy'

class MouseDownStrategyProvider {

    static get(intersection: Intersection, mode: ControllerModeType): IMouseDownStrategy {
        if (mode === ControllerModeType.MARKING)
            return new MarkingStrategy()
        else if (intersection.element === null)
            return new UnselectStartegy()
        else if (intersection.element.type === CanvasElementsTypes.RotationIndicator)
            return new RotationStrategy()
        else if (intersection.element.type === CanvasElementsTypes.ResizeIndicator)
            return new ResizeStrategy()
        else if (intersection.element !== null)
            return new SelectStartegy()
    }
}

export default MouseDownStrategyProvider