import Scene from "Core/Scene/Scene"
import Vector2 from "Utils/Vector2"
import Camera from "Core/Camera"
import SceneLayer from "./Scene/SceneLayer"
import MoveableElement from "CanvasObjects/Abstract/MoveableElement"
import Controller from "Core/Controller/Controller"

class Renderer {

    private _container: HTMLDivElement
    private _canvas: HTMLCanvasElement
    private _context: CanvasRenderingContext2D
    private _size: Vector2 = new Vector2()

    constructor(container: HTMLDivElement) {
        this._container = container
        this._canvas = document.createElement('canvas')
        this._context = this._canvas.getContext('2d')
        this._container.appendChild(this._canvas)
    }

    public setSize(size: Vector2) {
        this._size = size
        this.canvas.width = size.x
        this.canvas.height = size.y
    }

    public setRenderSize(size: Vector2) {
        this.canvas.style.width = `${size.x}px`
        this.canvas.style.height = `${size.y}px`
    }

    public render(scene: Scene, camera: Camera, controller: Controller) {
        this.clear()
        this._context.save()
        let r = camera.render.values
        this._context.setTransform(r[0][0], r[1][0], r[0][1], -r[1][1], r[0][2], r[1][2])
        if (scene.background) scene.background.draw(this._context)
        if (scene.layers.length) scene.layers.forEach(({ element }: SceneLayer<MoveableElement>) => element.draw(this._context))
        if (scene.border) scene.border.draw(this._context)
        if (controller.selectionIndicator) controller.selectionIndicator.draw(this._context)
        if (controller.markingBox) controller.markingBox.draw(this._context)
        this._context.restore()
    }

    private clear() {
        this._context.save()
        this._context.fillStyle = 'white'
        this._context.fillRect(0, 0, this.size.x, this.size.y)
        this._context.restore()
    }

    get size(): Vector2 { return this._size }
    get containerSize(): Vector2 { return new Vector2(this._container.clientWidth, this._container.clientHeight) }
    get canvas(): HTMLCanvasElement { return this._canvas }

}

export default Renderer

