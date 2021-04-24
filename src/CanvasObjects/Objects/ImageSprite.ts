import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'
import Vector from 'Utils/Vector2'
import CanvasElementTypes from 'CanvasObjects/types'

class ImageSprite extends MoveableElement {

    constructor(private _image: HTMLImageElement) {
        super(CanvasElementTypes.Image)
        this.originalSize = { width: _image.width, height: _image.height }
        this.size = { width: _image.width, height: _image.height }
        this.ratio = _image.width / _image.height
        this.position = new Vector()
    }

    get image() { return this._image }

    public draw(context: CanvasRenderingContext2D): void {
        this.resizeToFitCanvas(context)
        const { position, size, originalSize: {width, height }, rotation, image } = this
        context.save()
        context.translate(position.x, -position.y);
        context.rotate(-rotation);
        context.drawImage(image, 0,0, width, height, -size.width / 2, -size.height / 2, size.width, size.height)
        context.restore()
    }

}

export default ImageSprite