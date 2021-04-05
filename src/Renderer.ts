import Scene from "./Scene"
import Vector from "./Utils/Vector2"
import Camera from "./Camera"

class Renderer {

    private _container: HTMLDivElement
    private _canvas: HTMLCanvasElement
    private _context: CanvasRenderingContext2D
    private _size: Vector

    constructor(container: HTMLDivElement) {
        this._container = container
        this._canvas = document.createElement('canvas')
        this._context = this._canvas.getContext('2d')
        this._container.appendChild(this._canvas)
    }

    public setRenderSize(size: Vector) {
        this._canvas.style.width = `${size.x}px`
        this._canvas.style.height = `${size.y}px`
    }

    public setSize(scene: Scene) {
        this._size = new Vector(scene.background.width, scene.background.height)
    }

    public render(scene: Scene, camera: Camera){

    }

    get size(): Vector { return this._size }
    get containerSize(): Vector { return new Vector(this._container.clientWidth, this._container.clientHeight) }
    get canvas(): HTMLCanvasElement { return this._canvas }

}

export default Renderer

