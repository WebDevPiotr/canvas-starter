import RenderableElement from 'CanvasObjects/Abstract/RenderableElement'
import Vector from 'Utils/Vector2'
import CanvasElementsTypes from 'CanvasObjects/types'

class RotationIndicator extends RenderableElement {

    constructor(position: Vector) {
        super(CanvasElementsTypes.RotationIndicator)
        this.position = position
        this.size = { width: 10, height: 10 }
        this.originalSize = { width: 10, height: 10 }
    }

    public draw(context: CanvasRenderingContext2D, element: RenderableElement) {
        const { position: ePos, rotation: eRot } = element
        const { position: iPos, size: iSize } = this
        context.save()
        context.translate(ePos.x, -ePos.y);
        context.rotate(-eRot);
        context.translate(iPos.x, -iPos.y)
        context.beginPath();
        context.rect(-iSize.width / 2, -iSize.height / 2, iSize.width, iSize.height);
        context.fillStyle = "white"
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#00ccff"
        context.stroke();
        context.restore()
    }

}

export default RotationIndicator