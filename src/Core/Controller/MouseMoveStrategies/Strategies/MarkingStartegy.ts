import SceneController from 'Core/Controller/Controller';
import Vector from 'Utils/Vector2';
import IMouseMoveStrategy from '../IMouseMoveStrategy'

class MarkingStrategy implements IMouseMoveStrategy {

    public execute(mousePosiition: Vector, controller: SceneController) {
        controller.markingBox.resize(mousePosiition)
    }
}

export default MarkingStrategy