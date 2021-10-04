import Controller from 'Core/Controller/Controller';
import IMouseDownStrategy from '../IMouseDownStrategy'
import ControllerModeType from 'Core/Controller/ControllerModeType';
import { Intersection } from 'Core/types';

class DeselectStrategy implements IMouseDownStrategy {

    public execute(controller: Controller) {
        if(controller.selectedElement) controller.selectedElement.deselect()
        controller.selectedElement = null
        controller.mode = ControllerModeType.UNSELECTED
        controller.selectionIndicator = null
    }
}

export default DeselectStrategy