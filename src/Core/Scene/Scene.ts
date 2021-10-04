import Picture from "CanvasObjects/Objects/Picture"
import Background from "CanvasObjects/Objects/Background"
import SceneLayer from './SceneLayer'
import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'
class Scene {

    private _background: Background
    private _layers: Array<SceneLayer<Picture>> = new Array<SceneLayer<Picture>>()

    public setBackground(background: Background) {
        this._background = background
    }

    public add(picture: Picture) {
        this._layers.push(new SceneLayer(this._layers.length, picture))
    }

    public remove(element: MoveableElement) {
        this._layers = this._layers.filter(x => x.element.id !== element.id)
    }

    public clear() {
        this._background = null
        this._layers = []
    }

    public moveUp(element: MoveableElement) {
        const index = this._layers.findIndex(layer => layer.element.id === element.id)
        this._layers.splice(Math.min(this._layers.length-1, index + 1), 0, this._layers.splice(index, 1)[0]);
    }

    public moveDown(element: MoveableElement) {
        const index = this._layers.findIndex(layer => layer.element.id === element.id)
        this._layers.splice(Math.max(0, index - 1), 0, this._layers.splice(index, 1)[0]);
    }

    public serialize(): JsonConfig {
        const data = {
            background: this._background ? this._background.image.src : null,
            images: this._layers.map(layer => {
                const element = layer.element
                return {
                    src: element.image.src,
                    position: { x: element.position.x, y: element.position.y },
                    rotation: element.rotation,
                    flipX: element.flipX,
                    flipY: element.flipY,
                    scaleX: element.size.width / element.originalSize.width,
                    scaleY: element.size.height / element.originalSize.height,
                }
            })
        }
        return data
    }

    get background(): Background { return this._background }
    get layers(): Array<SceneLayer<MoveableElement>> { return this._layers }
}

export default Scene

export type JsonConfig = {
    background: string,
    images: Array<ImageConfig>
}

export type ImageConfig = {
    src: string,
    position: { x: number, y: number },
    rotation: number,
    flipX: boolean,
    flipY: boolean,
    scaleX: number,
    scaleY: number
}