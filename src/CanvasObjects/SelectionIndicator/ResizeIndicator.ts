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
        this.size = { width: 10, height: 10 }
        this.originalSize = { width: 10, height: 10 }
        this._placement = placement
    }

    public draw(context: CanvasRenderingContext2D, element: RenderableElement) {
        const { position: ePos, rotation: eRot } = element
        const { position: iPos, size: iSize } = this
        context.save()
        context.translate(ePos.x, ePos.y);
        context.rotate(eRot);
        context.beginPath();
        context.rect(iPos.x - iSize.width / 2, iPos.y - iSize.height / 2, iSize.width, iSize.height);
        context.strokeStyle = "#00ccff"
        context.fillStyle = "white"
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        context.restore()
    }

}

export default ResizeIndicator