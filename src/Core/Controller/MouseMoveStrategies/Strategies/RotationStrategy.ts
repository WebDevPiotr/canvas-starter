import SceneController from 'Core/Controller/Controller';
import Vector from 'Utils/Vector2';
import IMouseMoveStrategy from '../IMouseMoveStrategy'

class RotationStrategy implements IMouseMoveStrategy {

    public execute(mousePosiition: Vector, controller: SceneController) {
        controller.selectedElement.rotate(mousePosiition)
    }
}

export default RotationStrategy