import Controller from 'Core/Controller/Controller';
import IMouseDownStrategy from '../IMouseDownStrategy'
import { Intersection } from 'Core/types';
import ControllerModeType from 'Core/Controller/ControllerModeType';

class PanningStrategy implements IMouseDownStrategy {

    public execute(controller: Controller, intersection: Intersection) {
        controller.savedPosition = intersection.position.clone()
        controller.mode = ControllerModeType.PANNING
    }
}

export default PanningStrategy