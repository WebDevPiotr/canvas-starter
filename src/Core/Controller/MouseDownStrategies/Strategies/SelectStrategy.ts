import Controller from 'Core/Controller/Controller';
import IMouseDownStrategy from '../IMouseDownStrategy'
import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'
import ControllerModeType from 'Core/Controller/ControllerModeType';
import { Intersection } from 'Core/types';
import SelectionIndicator from 'CanvasObjects/SelectionIndicator/SelectionIndicator';

class SelectStrategy implements IMouseDownStrategy {

    public execute(intersection: Intersection, controller: Controller) {
        let element = intersection.element as MoveableElement
        if (controller.selectedElement && controller.selectedElement.id === element.id) {
            element.select(intersection.position)
            controller.mode = ControllerModeType.MOVING
        }
        else {
            if (controller.selectedElement) controller.selectedElement.deselect()
            element.select(intersection.position)
            controller.selectedElement = element
            controller.selectionIndicator = SelectionIndicator.fromElement(element)
            controller.mode = ControllerModeType.SELECTED
        }
    }
}

export default SelectStrategy