import RenderableElement from 'CanvasObjects/Abstract/RenderableElement'
import CanvasElementTypes from 'CanvasObjects/types'

class Background extends RenderableElement {

    constructor(private _image: HTMLImageElement) {
        super(CanvasElementTypes.Background)
        this.originalSize = { width: _image.width, height: _image.height }
        this.size = { width: _image.width, height: _image.height }
        this.ratio = _image.width / _image.height
    }

    get image() { return this._image }

    public draw(context: CanvasRenderingContext2D): void {
        const { originalSize: { width, height }, image } = this
        context.drawImage(image, -width / 2, -height / 2, width, height)
    }

}

export default Background