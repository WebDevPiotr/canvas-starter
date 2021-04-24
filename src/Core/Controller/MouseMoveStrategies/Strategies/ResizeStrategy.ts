import RenderableElement from 'CanvasObjects/Abstract/RenderableElement';
import ControllerModeType from 'Core/Controller/ControllerModeType';
import SceneController from 'Core/Controller/Controller';
import Vector from 'Utils/Vector2';
import IMouseMoveStrategy from '../IMouseMoveStrategy'
import { Size } from 'Core/types'

class Resizetrategy implements IMouseMoveStrategy {

    public execute(mousePosition: Vector, controller: SceneController) {
        const { position, rotation } = controller.selectedElement
        const mousePosInElementCoord = mousePosition.clone().rotateAboutOrigin(position, -rotation)
        const { newSize, newPosition } = this.resize(mousePosInElementCoord, controller.selectedElement, controller.mode)
        controller.selectedElement.resize(newSize, newPosition)
        controller.selectionIndicator.update()
    }

    private resize(mousePosition: Vector, element: RenderableElement, mode: ControllerModeType) {
        let deltaX: number, delta: Vector, newSize: Size, newPosition: Vector;
        switch (mode) {
            case ControllerModeType.RESIZING_T:
                delta = new Vector(0, mousePosition.y - (element.position.y + element.size.height / 2))
                newSize = { width: element.size.width, height: element.size.height + delta.y }
                delta.rotateAboutOrigin(new Vector(), element.rotation)
                newPosition = element.position.clone().add(delta.divBy(2))
                break;
            case ControllerModeType.RESIZING_B:
                delta = new Vector(0, (element.position.y - element.size.height / 2) - mousePosition.y)
                newSize = { width: element.size.width, height: element.size.height + delta.y }
                delta.rotateAboutOrigin(new Vector(), element.rotation)
                newPosition = element.position.clone().sub(delta.divBy(2))
                break;
            case ControllerModeType.RESIZING_L:
                delta = new Vector((element.position.x- element.size.width / 2) - mousePosition.x, 0)
                newSize = { width: element.size.width + delta.x, height: element.size.height }
                delta.rotateAboutOrigin(new Vector(), element.rotation)
                newPosition = element.position.clone().sub(delta.divBy(2))
                break;
            case ControllerModeType.RESIZING_R:
                delta = new Vector(mousePosition.x - (element.position.x + element.size.width / 2), 0)
                newSize = { width: element.size.width + delta.x, height: element.size.height }
                delta.rotateAboutOrigin(new Vector(), element.rotation)
                newPosition = element.position.clone().add(delta.divBy(2))
                break;

            case ControllerModeType.RESIZING_TR:
                deltaX = mousePosition.x - (element.position.x + element.size.width / 2)
                delta = new Vector(deltaX, deltaX / element.ratio)
                newSize = { width: element.size.width + delta.x, height: element.size.height + delta.y }
                delta.rotateAboutOrigin(new Vector(), element.rotation)
                newPosition = new Vector(element.position.x + delta.x / 2, element.position.y + delta.y / 2)
                break;
            case ControllerModeType.RESIZING_TL:
                deltaX = (element.position.x- element.size.width / 2) - mousePosition.x
                delta = new Vector(deltaX, deltaX / element.ratio)
                newSize = { width: element.size.width + delta.x, height: element.size.height + delta.y }
                delta.rotateAboutOrigin(new Vector(), -element.rotation)
                newPosition = new Vector(element.position.x - delta.x / 2, element.position.y + delta.y / 2)
                break;
            case ControllerModeType.RESIZING_BR:
                deltaX = mousePosition.x - (element.position.x + element.size.width / 2)
                delta = new Vector(deltaX, deltaX / element.ratio)
                newSize = { width: element.size.width + delta.x, height: element.size.height + delta.y }
                delta.rotateAboutOrigin(new Vector(), -element.rotation)
                newPosition = new Vector(element.position.x + delta.x / 2, element.position.y - delta.y / 2)
                break;
            case ControllerModeType.RESIZING_BL:
                deltaX = (element.position.x- element.size.width / 2) - mousePosition.x
                delta = new Vector(deltaX, deltaX / element.ratio)
                newSize = { width: element.size.width + delta.x, height: element.size.height + delta.y }
                delta.rotateAboutOrigin(new Vector(), element.rotation)
                newPosition = new Vector(element.position.x - delta.x / 2, element.position.y - delta.y / 2)
                break;
        }

        return { newSize, newPosition }
    }
}

export default Resizetrategy