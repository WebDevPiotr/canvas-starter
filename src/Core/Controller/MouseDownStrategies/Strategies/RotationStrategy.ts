import SceneController from 'Core/Controller/Controller';
import IMouseDownStrategy from '../IMouseDownStrategy'
import ControllerModeType from 'Core/Controller/ControllerModeType';
import { Intersection } from 'Core/types';

class RotationStrategy implements IMouseDownStrategy {

    public execute(intersection: Intersection, controller: SceneController) {
        controller.mode = ControllerModeType.ROTATING
    }
}

export default RotationStrategy