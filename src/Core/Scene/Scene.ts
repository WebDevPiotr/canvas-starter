import ImageSprite from "CanvasObjects/Objects/ImageSprite"
import Background from "CanvasObjects/Objects/Background"
import Border from "CanvasObjects/Objects/Border"
import SceneLayer from './SceneLayer'
import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'

class Scene {

    private _background: Background
    private _layers: Array<SceneLayer<MoveableElement>> = new Array<SceneLayer<MoveableElement>>()
    private _border: Border

    public setBackground(image: HTMLImageElement) {
        this._background = new Background(image)
    }

    public setBorder(image: HTMLImageElement) {
        this._border = new Border(image)
    }

    public add(image: HTMLImageElement) {
        this._layers.push(new SceneLayer(this._layers.length, new ImageSprite(image)))
    }

    public remove(element: MoveableElement) {
        this._layers = this._layers.filter(x => x.element.id !== element.id)
    }

    public serialize(): string{
        const data = {

        }
        return JSON.stringify(data)
    }

    get background(): Background { return this._background }
    get border(): Border { return this._border }
    get layers(): Array<SceneLayer<MoveableElement>> { return this._layers }
}

export default Scene