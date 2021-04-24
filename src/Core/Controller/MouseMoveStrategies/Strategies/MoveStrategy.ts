import SceneController from 'Core/Controller/Controller';
import Vector from 'Utils/Vector2';
import IMouseMoveStrategy from '../IMouseMoveStrategy'
import ControllerModeType from 'Core/Controller/ControllerModeType';

class MoveStrategy implements IMouseMoveStrategy {

    public execute(mousePosiition: Vector, controller: SceneController) {
        controller.selectedElement.move(mousePosiition)
        controller.mode = ControllerModeType.MOVING
    }
}

export default MoveStrategy