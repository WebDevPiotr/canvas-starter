import SceneController from 'Core/Controller/Controller';
import IMouseUpStrategy from '../IMouseUpStrategy'

class EndMarkingStrategy implements IMouseUpStrategy {

    public execute(controller: SceneController) {
        controller.markingBox.end()
    }
}

export default EndMarkingStrategy