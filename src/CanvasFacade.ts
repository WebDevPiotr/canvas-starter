import Scene from 'Core/Scene/Scene'
import Renderer from 'Core/Renderer'
import ImageLoader, { ImageSource } from 'Utils/ImageLoader'
import Camera from 'Core/Camera'
import Controller from 'Core/Controller/Controller'
import Vector2 from 'Utils/Vector2'
import ExportTypes from 'Export/types'
import ImageSprite from 'CanvasObjects/Objects/ImageSprite'
import ExportStrategyProvider from 'Export/ExportStrategyProvider'
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

    public async loadBackground(source: ImageSource) {
        const image: HTMLImageElement = await ImageLoader.load(source)
        const imageSize = new Vector2(image.width, image.height)
        this.renderer.setSize(imageSize)
        this.controller.handleResize()
        this.scene.setBackground(image)
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public async loadImage(source: ImageSource) {
        const image: HTMLImageElement = await ImageLoader.load(source)
        this.scene.add(image)
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public async loadBorder(source: ImageSource) {
        const image: HTMLImageElement = await ImageLoader.load(source)
        this.scene.setBorder(image)
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public remove(layer: ImageSprite) {
        this.scene.remove(layer)
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public setZoom(zoom: number) {
        this.camera.setZoom(zoom)
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public zoomIn() {
        this.camera.zoomIn()
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public zoomOut() {
        this.camera.zoomOut()
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public download(format: ExportTypes) {
        ExportStrategyProvider.get(format).execute(this.renderer.canvas)
    }

    public serialize() {
        const sceneData = this.scene.serialize()
        const blob = new Blob([sceneData], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = `$Test.json`;
        a.click();
    }

    public unmount() {
        this.controller.stop()
    }

}

export default CanvasFacade