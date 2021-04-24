import SceneController from 'Core/Controller/Controller';
import Vector2 from 'Utils/Vector2';
import IMouseMoveStrategy from '../IMouseMoveStrategy'

class PanningStrategy implements IMouseMoveStrategy {

    public execute(mousePosition: Vector2, controller: SceneController) {
        controller.camera.move(mousePosition.sub(controller.savedPosition))
    }
}

export default PanningStrategy