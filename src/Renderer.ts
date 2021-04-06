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

    public setSize(size: Vector) {
        this._size = size
        this.canvas.width = size.x
        this.canvas.height = size.y
    }

    public render(scene: Scene, camera: Camera){
        this._context.save()
        this._context.fillStyle = 'white'
        this._context.fillRect(0, 0, this.size.x, this.size.y)
    
        let r = camera.render.values
    
        this._context.setTransform(r[0][0], r[1][0], r[0][1], -r[1][1], r[0][2], r[1][2])

        scene.layers.forEach((image) => {
            this._context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height)
        })

        this._context.restore()
    }

    get size(): Vector { return this._size }
    get containerSize(): Vector { return new Vector(this._container.clientWidth, this._container.clientHeight) }
    get canvas(): HTMLCanvasElement { return this._canvas }

}

export default Renderer

