import SceneController from 'Core/Controller/Controller';
import IMouseDownStrategy from '../IMouseDownStrategy'
import ControllerModeType from 'Core/Controller/ControllerModeType';
import ResizeIndicator from 'CanvasObjects/SelectionIndicator/ResizeIndicator'
import { Intersection } from 'Core/types';
import Placement from 'CanvasObjects/SelectionIndicator/Placement';

class ResizeStrategy implements IMouseDownStrategy {

    public execute(intersection: Intersection, controller: SceneController) {
        const element = intersection.element as ResizeIndicator
        switch (element.placement) {
            case Placement.TOP:
                controller.mode = ControllerModeType.RESIZING_T
                break;
            case Placement.TOP_LEFT:
                controller.mode = ControllerModeType.RESIZING_TL
                break;
            case Placement.TOP_RIGHT:
                controller.mode = ControllerModeType.RESIZING_TR
                break;
            case Placement.LEFT:
                controller.mode = ControllerModeType.RESIZING_L
                break;
            case Placement.RIGHT:
                controller.mode = ControllerModeType.RESIZING_R
                break;
            case Placement.BOTTOM:
                controller.mode = ControllerModeType.RESIZING_B
                break;
            case Placement.BOTTOM_LEFT:
                controller.mode = ControllerModeType.RESIZING_BL
                break;
            case Placement.BOTTOM_RIGHT:
                controller.mode = ControllerModeType.RESIZING_BR
                break;
        }
    }
}

export default ResizeStrategy