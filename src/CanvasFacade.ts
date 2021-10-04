import Scene, { JsonConfig } from 'Core/Scene/Scene'
import Renderer from 'Core/Renderer'
import ImageLoader, { ImageSource } from 'Utils/ImageLoader'
import TextToImage, { TextConfig } from 'Utils/TextToImage'
import Camera from 'Core/Camera'
import Controller from 'Core/Controller/Controller'
import Vector2 from 'Utils/Vector2'
import ExportTypes from 'Export/types'
import ExportStrategyProvider from 'Export/ExportStrategyProvider'
import EventEmitter, { Callback } from 'EventEmitter/EventEmitter'
import Background from 'CanvasObjects/Objects/Background'
import Picture from 'CanvasObjects/Objects/Picture'
import DeselectStrategy from 'Core/Controller/MouseDownStrategies/Strategies/DeselectStrategy'
import download from 'Utils/Download'
import JsonLoader, { JsonSource } from 'Utils/JsonLoader'
import { ImageConfig } from 'Core/Scene/Scene'

class CanvasFacade {

    private scene: Scene
    private renderer: Renderer
    private camera: Camera
    private controller: Controller
    private eventEmitter: EventEmitter

    constructor() {
        this.scene = new Scene()
        this.camera = new Camera()
        this.eventEmitter = new EventEmitter()
    }

    public async loadBackground(source: ImageSource) {
        const image: HTMLImageElement = await ImageLoader.load(source)
        const imageSize = new Vector2(image.width, image.height)
        this.renderer.setSize(imageSize)
        this.controller.handleResize()
        this.scene.setBackground(new Background(image))
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public async loadImage(source: ImageSource, config?: ImageConfig) {
        const image: HTMLImageElement = await ImageLoader.load(source)
        this.scene.add(new Picture(image, config))
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public async loadText(textConfig: TextConfig) {
        const image: HTMLImageElement = await TextToImage(textConfig, this.camera.renderScaleScalar)
        this.scene.add(new Picture(image))
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public remove() {
        if (this.controller.selectedElement) {
            this.scene.remove(this.controller.selectedElement)
            new DeselectStrategy().execute(this.controller)
            this.renderer.render(this.scene, this.camera, this.controller)
        }
    }

    public setZoom(zoom: number) {
        this.camera.setZoom(zoom)
        this.renderer.render(this.scene, this.camera, this.controller)
        return this.camera.zoomScalar
    }

    public zoomIn() {
        this.camera.zoomIn()
        this.renderer.render(this.scene, this.camera, this.controller)
        return this.camera.zoomScalar
    }

    public zoomOut() {
        this.camera.zoomOut()
        this.renderer.render(this.scene, this.camera, this.controller)
        return this.camera.zoomScalar
    }

    public download(format: ExportTypes) {
        new DeselectStrategy().execute(this.controller)
        this.renderer.render(this.scene, this.camera, this.controller)
        ExportStrategyProvider.get(format).execute(this.renderer.canvas)
    }

    public flipX() {
        if (this.controller.selectedElement) {
            this.controller.selectedElement.flipX = !this.controller.selectedElement.flipX
            this.renderer.render(this.scene, this.camera, this.controller)
        }
    }

    public flipY() {
        if (this.controller.selectedElement) {
            this.controller.selectedElement.flipY = !this.controller.selectedElement.flipY
            this.renderer.render(this.scene, this.camera, this.controller)
        }
    }

    public serialize() {
        const sceneData = this.scene.serialize()
        download(JSON.stringify(sceneData), 'application/json', 'test.json')
    }

    public async deserialize(source: JsonSource) {
        const config: JsonConfig = await JsonLoader.load(source)
        if (config.background) this.loadBackground(config.background)
        if (config.images.length) {
            config.images.reduce(async (previousPromise, image) => {
                await previousPromise;
                return this.loadImage(image.src, image);
            }, Promise.resolve());
        }
    }

    public subscribe(eventName: string, callback: Callback) {
        this.eventEmitter.subscribe(eventName, callback)
    }

    public moveUp() {
        this.scene.moveUp(this.controller.selectedElement)
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public moveDown() {
        this.scene.moveDown(this.controller.selectedElement)
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public clear() {
        this.scene.clear()
        this.renderer.reset()
        this.controller.selectedElement = null
        this.controller.selectionIndicator = null
        this.controller.handleResize()
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public mount(container: HTMLDivElement) {
        this.renderer = new Renderer(container)
        this.controller = new Controller(this.scene, this.renderer, this.camera, this.eventEmitter)
        this.controller.init()
        this.renderer.render(this.scene, this.camera, this.controller)
    }

    public unmount() {
        this.controller.stop()
    }

}

export default CanvasFacade