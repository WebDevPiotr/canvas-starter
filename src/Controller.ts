import Vector2 from './Utils/Vector2'
import Matrix3 from './Utils/Matrix3'
import Renderer from './Renderer'
import Camera from './Camera'
import CanvasResizer from './CanvasResizer'
import Scene from './Scene'

class Controller {

    private scene: Scene
    private renderer: Renderer
    private camera: Camera
    private resizer: CanvasResizer
    private isMouseDown: boolean = false
    private savedPosition: Vector2

    constructor(scene: Scene, renderer: Renderer, camera: Camera) {
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.resizer = new CanvasResizer(this.renderer)

        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseScroll = this.handleMouseScroll.bind(this)
        this.handleResize = this.handleResize.bind(this)
    }

    public init() {
        this.renderer.canvas.addEventListener('mousedown', this.handleMouseDown)
        this.renderer.canvas.addEventListener('mousemove', this.handleMouseMove)
        this.renderer.canvas.addEventListener('mouseup', this.handleMouseUp)
        this.renderer.canvas.addEventListener('wheel', this.handleMouseScroll)
        window.addEventListener('resize', this.handleResize)
    }

    public stop() {
        this.renderer.canvas.removeEventListener('mousedown', this.handleMouseDown)
        this.renderer.canvas.removeEventListener('mousemove', this.handleMouseMove)
        this.renderer.canvas.removeEventListener('mouseup', this.handleMouseUp)
        this.renderer.canvas.removeEventListener('wheel', this.handleMouseScroll)
        window.removeEventListener('resize', this.handleResize)
    }

    private handleMouseDown(e: MouseEvent) {
        this.isMouseDown = true
        const screenPosition = this.getCoordinatesFromEvent(e)
        const imagePosition = this.camera.getImageCoordinates(screenPosition)
        this.savedPosition = imagePosition.clone()

    }

    private handleMouseMove(e: MouseEvent) {
        if (this.isMouseDown) {
            const screenPosition = this.getCoordinatesFromEvent(e)
            const imagePosition = this.camera.getImageCoordinates(screenPosition)
            this.camera.move(imagePosition.sub(this.savedPosition))
            this.renderer.render(this.scene, this.camera)
        }
    }

    private handleMouseUp() {
        this.isMouseDown = false
        this.camera.checkViewport()
        this.renderer.render(this.scene, this.camera)
    }

    private handleMouseScroll(e: WheelEvent) {

        if (e.deltaY > 0) this.camera.zoomIn()
        else this.camera.zoomOut()
        this.renderer.render(this.scene, this.camera)
    }

    public handleResize() {
        const size: Vector2 = this.resizer.resize()
        this.renderer.canvas.style.width = `${size.x}px`
        this.renderer.canvas.style.height = `${size.y}px`
        this.camera.setRenderMatrix(this.renderer.size, size)
    }

    private getCoordinatesFromEvent(e: MouseEvent) {
        const canvas = this.renderer.canvas
        return new Vector2(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
    }

}

export default Controller