import Controller from 'Core/Controller/Controller';
import IMouseUpStrategy from '../IMouseUpStrategy'
import ControllerModeType from 'Core/Controller/ControllerModeType';

class PanningStrategy implements IMouseUpStrategy {

    public execute(controller: Controller) {
        controller.mode = ControllerModeType.UNSELECTED
        controller.camera.keepInsideCanvas()
    }
}

export default PanningStrategy