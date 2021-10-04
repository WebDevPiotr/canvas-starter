import MoveableElement from "CanvasObjects/Abstract/MoveableElement";
import RenderableElement from 'CanvasObjects/Abstract/RenderableElement'
import { Intersection, Size } from "Core/types";
import Vector from "Utils/Vector2";
import SceneController from "Core/Controller/Controller";
import SceneLayer from 'Core/Scene/SceneLayer'

class CanvasInspector {

    public findClickedElement(clickPosition: Vector, layers: SceneLayer<MoveableElement>[], controller: SceneController, scale: number): Intersection {
        let clickedLayer: SceneLayer<MoveableElement>

        if (controller.selectionIndicator) {
            let indicators = controller.selectionIndicator.elements
            for (let indicator of indicators) {
                if (this.isIndicatorClicked(clickPosition, indicator, controller.selectedElement, scale))
                    return { element: indicator, position: clickPosition }
            }
        }

        for (let layer of layers) {
            if (this.isElementClicked(clickPosition, layer.element)) {
                clickedLayer = layer
            }
        }

        return { element: clickedLayer?.element || null, position: clickPosition }
    }

    private isElementClicked(clickPosition: Vector, element: RenderableElement): boolean {
        const { size, position, rotation } = element
        let clickPosInElementCoord = clickPosition.clone().rotateAboutOrigin(position, -rotation)
        return this.isClicked(clickPosInElementCoord, position, size)
    }

    private isIndicatorClicked(clickPosition: Vector, indicator: RenderableElement, element: RenderableElement, scale: number): boolean {
        const { position: ePos, rotation } = element
        const { position: iPos, size } = indicator
        let indicatorPosition = ePos.clone().add(iPos)
        let clickPosInElementCoord = clickPosition.clone().rotateAboutOrigin(ePos, -rotation)
        const scaledSize: Size = { width: size.width * scale, height: size.height * scale }
        return this.isClicked(clickPosInElementCoord, indicatorPosition, scaledSize)
    }

    private isClicked(clickPosition: Vector, elementPosition: Vector, elementSize: Size): boolean {
        return (
            clickPosition.x >= elementPosition.x - elementSize.width / 2 &&
            clickPosition.x <= elementPosition.x + elementSize.width / 2 &&
            clickPosition.y >= elementPosition.y - elementSize.height / 2 &&
            clickPosition.y <= elementPosition.y + elementSize.height / 2
        )
    }
}

export default CanvasInspector