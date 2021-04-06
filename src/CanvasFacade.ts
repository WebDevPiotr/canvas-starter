import Scene from './Scene'
import Renderer from './Renderer'
import ImageLoader, { ImageSource } from './ImageLoader'
import Camera from './Camera'
import Controller from './Controller'
import Vector from './Utils/Vector2'

class CanvasFacade {

    private scene: Scene
    private renderer: Renderer
    private camera: Camera
    private controller: Controller

    constructor(container: HTMLDivElement) {
        this.scene = new Scene()
        this.renderer = new Renderer(container)
        this.camera = new Camera()
        this.controller = new Controller(this.scene, this.renderer, this.camera)
        this.controller.init()
    }

    public async load(source: ImageSource, layerIndex: number) {
        const image: HTMLImageElement = await ImageLoader.load(source)
        if(this.scene.layers.size === 0) {
            const imageSize = new Vector(image.width, image.height)
            this.renderer.setSize(imageSize)
            this.controller.handleResize()
        }
        this.scene.add(image, layerIndex)
        this.renderer.render(this.scene, this.camera)
    }

    public remove(layerIndex: number) {
        this.scene.remove(layerIndex)
        this.renderer.render(this.scene, this.camera)
    }

    public zoomIn() {
        this.camera.zoomIn()
        this.renderer.render(this.scene, this.camera)
    }

    public zoomOut() {
        this.camera.zoomOut()
        this.renderer.render(this.scene, this.camera)
    }

    public unmount() {
        this.controller.stop()
    }

}

export default CanvasFacade