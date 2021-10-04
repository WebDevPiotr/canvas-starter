import RenderableElement from 'CanvasObjects/Abstract/RenderableElement'
import Vector from 'Utils/Vector2'
import CanvasElementsTypes from 'CanvasObjects/types'
import Placement from './Placement'

class ResizeIndicator extends RenderableElement {

    private _placement: Placement

    get placement() { return this._placement }

    constructor(position: Vector, placement: Placement) {
        super(CanvasElementsTypes.ResizeIndicator)
        this.position = position
        this.size = { width: 20, height: 20 }
        this.originalSize = { width: 20, height: 20 }
        this._placement = placement
    }

    public draw(context: CanvasRenderingContext2D, element: RenderableElement, scale: number) {
        const { position: ePos, rotation: eRot } = element
        const { position: iPos, size: iSize } = this
        context.save()
        context.translate(ePos.x, -ePos.y);
        context.rotate(-eRot);
        context.beginPath();
        context.rect(iPos.x - iSize.width / 2 * scale, iPos.y - iSize.height / 2 * scale, iSize.width * scale, iSize.height * scale);
        context.strokeStyle = "#00ccff"
        context.fillStyle = "white"
        context.fill();
        context.lineWidth = Math.round(2 * scale)
        context.stroke();
        context.restore()
    }

}

export default ResizeIndicator