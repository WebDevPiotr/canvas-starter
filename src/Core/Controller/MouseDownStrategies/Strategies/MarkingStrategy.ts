import SceneController from 'Core/Controller/Controller';
import IMouseDownStrategy from '../IMouseDownStrategy'
import { Intersection } from 'Core/types';
import MarkingBox from 'CanvasObjects/MarkingBox/MarkingBox';

class MarkingStrategy implements IMouseDownStrategy {

    public execute(intersection: Intersection, controller: SceneController) {
        if (controller.selectedElement) controller.selectedElement.deselect()
        controller.selectedElement = null
        controller.markingBox = new MarkingBox(intersection.position)
    }
}

export default MarkingStrategy