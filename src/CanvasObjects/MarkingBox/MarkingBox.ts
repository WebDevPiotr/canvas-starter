import Vector from "Utils/Vector2";
import RenderableElement from "../Abstract/RenderableElement";
import CanvasElementTypes from "CanvasObjects/types";
import MarkingBoxState from './MarkingBoxState'

class MarkingBox extends RenderableElement {

    private _state: MarkingBoxState

    constructor(startPosition: Vector) {
        super(CanvasElementTypes.MarkingBox)
        this.position = startPosition
        this.size = { width: 0, height: 0 }
        this._state = MarkingBoxState.RESIZING
    }

    public resize(mousePosition: Vector) {
        this.size = { width: mousePosition.x - this.position.x, height: mousePosition.y - this.position.y }
    }

    public end(){
        this._state = MarkingBoxState.FINAL
    }

    get state() { return this._state }
    set state(state: MarkingBoxState) { this._state = state }

    public draw(context: CanvasRenderingContext2D) {
        const { position, size, state } = this
        context.save()
        context.lineWidth = 1;
        if(state === MarkingBoxState.FINAL) {
            context.setLineDash([5, 10]);
            context.strokeStyle = "rgba(0, 0, 255, 1)"
        }
        if(state === MarkingBoxState.RESIZING){
            context.strokeStyle = "rgba(127, 205, 255, 1)"
            context.fillStyle = "rgba(127, 205, 255, 0.5)"
        }
        context.beginPath();
        context.rect(position.x, position.y, size.width, size.height);
        if(state === MarkingBoxState.RESIZING) context.fill();
        context.stroke();
        context.restore()
    }
}

export default MarkingBox