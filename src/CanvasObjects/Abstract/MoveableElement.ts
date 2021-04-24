import RenderableElement from './RenderableElement'
import Vector from 'Utils/Vector2'
import { Size } from 'Core/types'

interface IMoveable {
    select(mousePosition: Vector): void
    deselect(): void
    move(mousePosition: Vector): void
}

abstract class MoveableElement extends RenderableElement implements IMoveable {

    private _isClickable: boolean = true
    private _isSelected: boolean = false
    private _offset: Vector

    get isClickable() { return this._isClickable }
    set isClickable(isClickable: boolean) { this._isClickable = isClickable }

    get isSelected() { return this._isSelected }

    public select(mousePosiition: Vector) {
        this._isSelected = true
        this._offset = mousePosiition.sub(this.position)
    }

    public deselect() {
        this._isSelected = false
    }

    public move(mousePosiition: Vector) {
        this.position = mousePosiition.sub(this._offset)
    }

    public rotate(mousePosiition: Vector) {
        this.rotation = mousePosiition.sub(this.position).angleBetween(new Vector(0, -1))
    }

    public resize(newSize: Size, newPosition: Vector) {
        if (newSize.width > 0 && newSize.height > 0) {
            this.size = newSize
            this.position = newPosition
            this.ratio = this.size.width / this.size.height
        }
    }

}

export default MoveableElement