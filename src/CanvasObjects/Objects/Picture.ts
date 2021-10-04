import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'
import Vector from 'Utils/Vector2'
import CanvasElementTypes from 'CanvasObjects/types'
import { ImageConfig } from 'Core/Scene/Scene'

class Picture extends MoveableElement {

    constructor(private _image: HTMLImageElement, config?: ImageConfig) {
        super(CanvasElementTypes.Image)
        this.originalSize = { width: _image.width, height: _image.height }
        this.size = {
            width: config ? config.scaleX * _image.width : _image.width,
            height: config ? config.scaleY * _image.height : _image.height
        }
        this.ratio = this.size.width / this.size.height
        this.position = config ? new Vector(config.position.x, config.position.y) : new Vector()
        this.rotation = config ? config.rotation : 0
        this.flipX = config ? config.flipX : false
        this.flipY = config ? config.flipY : false
    }

    get image() { return this._image }

    public draw(context: CanvasRenderingContext2D): void {
        this.resizeToFitCanvas(context)
        const { position, size, originalSize: { width, height }, rotation, image } = this
        context.save()
        context.translate(position.x, -position.y);
        context.rotate(-rotation);
        context.scale(this._flipY ? -1 : 1, this._flipX ? -1 : 1)
        context.drawImage(image, 0, 0, width, height, -size.width / 2, -size.height / 2, size.width, size.height)
        context.restore()
    }

}

export default Picture