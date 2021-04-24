import ControllerModeType from 'Core/Controller/ControllerModeType';
import SceneController from 'Core/Controller/Controller';
import IMouseUpStrategy from '../IMouseUpStrategy'

class BackToSelectStrategy implements IMouseUpStrategy {

    public execute(controller: SceneController) {
        controller.mode = ControllerModeType.SELECTED
    }
}

export default BackToSelectStrategy