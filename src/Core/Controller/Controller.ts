import Vector2 from 'Utils/Vector2'
import Renderer from 'Core/Renderer'
import Camera from 'Core/Camera'
import CanvasResizer from 'Core/CanvasResizer'
import Scene from 'Core/Scene/Scene'
import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'
import SelectionIndicator from 'CanvasObjects/SelectionIndicator/SelectionIndicator'
import ControllerModeType from 'Core/Controller/ControllerModeType'
import MarkingBox from 'CanvasObjects/MarkingBox/MarkingBox'
import { Intersection } from 'Core/types'
import CanvasInspector from 'Core/CanvasInspector'
import MouseDownStrategyProvider from './MouseDownStrategies/MouseDownStrategyProvider'

class Controller {

    private _scene: Scene
    private _renderer: Renderer
    private _camera: Camera
    private _resizer: CanvasResizer

    private _isMouseDown: boolean = false
    private _savedPosition: Vector2

    private _mode: ControllerModeType = ControllerModeType.UNSELECTED
    private _selectedElement: MoveableElement
    private _selectionIndicator: SelectionIndicator
    private _markingBox: MarkingBox
   // private _clipBoard: ClipBoard = new ClipBoard()

    constructor(scene: Scene, renderer: Renderer, camera: Camera) {
        this._scene = scene
        this._renderer = renderer
        this._camera = camera
        this._resizer = new CanvasResizer(this.renderer)

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
        this._isMouseDown = true
        const screenPosition = this.getCoordinatesFromEvent(e)
        const imagePosition = this.camera.getImageCoordinates(screenPosition)
        this._savedPosition = imagePosition.clone()
        const intersection = this.intersectScene(imagePosition)
        MouseDownStrategyProvider.get(intersection, this.mode)?.execute(intersection, this)
        this.renderer.render(this.scene, this.camera, this)

    }

    private handleMouseMove(e: MouseEvent) {
        if (this._isMouseDown) {
            const screenPosition = this.getCoordinatesFromEvent(e)
            const imagePosition = this.camera.getImageCoordinates(screenPosition)
            this.camera.move(imagePosition.sub(this._savedPosition))
            this.renderer.render(this.scene, this.camera, this)
        }
    }

    private handleMouseUp() {
        this._isMouseDown = false
        this.camera.keepInsideCanvas()
        this.renderer.render(this.scene, this.camera, this)
    }

    private handleMouseScroll(e: WheelEvent) {
        if (e.deltaY > 0) this.camera.zoomIn()
        else this.camera.zoomOut()
        this.renderer.render(this.scene, this.camera, this)
    }

    public handleResize() {
        const size: Vector2 = this._resizer.resize()
        this.renderer.setRenderSize(size)
        this.camera.setRenderMatrix(this.renderer.size, size)
    }

    private getCoordinatesFromEvent(e: MouseEvent) {
        const canvas = this.renderer.canvas
        return new Vector2(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
    }

    private intersectScene(mousePos: Vector2): Intersection {
        return new CanvasInspector().findClickedElement(mousePos, this.scene.layers, this)
    }

    get selectedElement() { return this._selectedElement }
    set selectedElement(selectedElement: MoveableElement) { this._selectedElement = selectedElement }

    get mode() { return this._mode }
    set mode(mode: ControllerModeType) { this._mode = mode }

    get selectionIndicator() { return this._selectionIndicator }
    set selectionIndicator(selectionIndicator: SelectionIndicator) { this._selectionIndicator = selectionIndicator }

    get markingBox() { return this._markingBox }
    set markingBox(markingBox: MarkingBox) { this._markingBox = markingBox }

    get scene() { return this._scene }
    get renderer() { return this._renderer }
    get camera() { return this._camera }
}

export default Controller