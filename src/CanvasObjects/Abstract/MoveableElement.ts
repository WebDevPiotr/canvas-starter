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
    protected _flipY: boolean = false
    protected _flipX: boolean = false

    get isClickable() { return this._isClickable }
    set isClickable(isClickable: boolean) { this._isClickable = isClickable }

    get isSelected() { return this._isSelected }
    get flipX() { return this._flipX }
    set flipX(value: boolean) { this._flipX = value  }
    get flipY() { return this._flipY }
    set flipY(value: boolean) { this._flipY = value  }


    public select(mousePosiition: Vector) {
        this._isSelected = true
        this._offset = mousePosiition.clone().sub(this.position)
    }

    public deselect() {
        this._isSelected = false
    }

    public move(mousePosiition: Vector) {
        this.position = mousePosiition.clone().sub(this._offset)
    }

    public rotate(mousePosiition: Vector) {
        this.rotation = mousePosiition.sub(this.position).angleBetween(new Vector(0, 1))
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