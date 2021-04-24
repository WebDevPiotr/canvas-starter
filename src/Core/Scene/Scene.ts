import ImageSprite from "CanvasObjects/Objects/ImageSprite"
import SceneBackground from "CanvasObjects/Objects/SceneBackground"
import SceneLayer from './SceneLayer'
import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'

class Scene {

    private _background: SceneBackground
    private _layers: Array<SceneLayer<MoveableElement>> = new Array<SceneLayer<MoveableElement>>()

    public setBackground(image: HTMLImageElement) {
        this._background = new SceneBackground(image)
    }

    public add(image: HTMLImageElement) {
        this._layers.push(new SceneLayer(this._layers.length, new ImageSprite(image)))
    }

    public remove(element: MoveableElement) {
        this._layers = this._layers.filter(x => x.element.id !== element.id)
    }

    get background(): SceneBackground { return this._background }
    get layers(): Array<SceneLayer<MoveableElement>> { return this._layers }
}

export default Scene