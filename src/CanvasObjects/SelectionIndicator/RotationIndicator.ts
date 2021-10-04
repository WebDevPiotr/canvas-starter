import RenderableElement from 'CanvasObjects/Abstract/RenderableElement'
import Vector from 'Utils/Vector2'
import CanvasElementsTypes from 'CanvasObjects/types'
import Camera from 'Core/Camera'

class RotationIndicator extends RenderableElement {

    constructor(position: Vector) {
        super(CanvasElementsTypes.RotationIndicator)
        this.position = position
        this.size = { width: 80, height: 80 }
        this.originalSize = { width: 80, height: 80 }
    }

    public draw(context: CanvasRenderingContext2D, element: RenderableElement, scale: number) {
        const { position: ePos, rotation: eRot } = element
        const { position: iPos, size: iSize } = this
        context.save()
        context.translate(ePos.x, -ePos.y);
        context.rotate(-eRot);
        context.translate(iPos.x, -iPos.y)
        context.beginPath();
        context.rect(-iSize.width / 8 * scale,-iSize.height / 8 * scale, iSize.width/4 * scale, iSize.height/4 * scale);
        //context.rect(-iSize.width / 4 * scale,-iSize.height / 4 * scale, iSize.width/2 * scale, iSize.height/2 * scale);
        context.fillStyle = "white"
        context.fill();
        context.lineWidth = Math.round(2 * scale)
        context.strokeStyle = "#00ccff"
        context.stroke();
        context.restore()
    }

}

export default RotationIndicator