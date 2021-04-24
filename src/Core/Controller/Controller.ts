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
import MouseMoveStrategyProvider from './MouseMoveStrategies/MouseMoveStrategyProvider'
import MouseUpStrategyProvider from './MouseUpStrategies/MouseUpStrategyProvider'

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
        this.handleResize = this.handleResize.bind(this)
    }

    public init() {
        this.renderer.canvas.addEventListener('mousedown', this.handleMouseDown)
        this.renderer.canvas.addEventListener('mousemove', this.handleMouseMove)
        this.renderer.canvas.addEventListener('mouseup', this.handleMouseUp)
        this.renderer.canvas.addEventListener('contextmenu', this.disableContextMenu)
        window.addEventListener('resize', this.handleResize)
    }

    public stop() {
        this.renderer.canvas.removeEventListener('mousedown', this.handleMouseDown)
        this.renderer.canvas.removeEventListener('mousemove', this.handleMouseMove)
        this.renderer.canvas.removeEventListener('mouseup', this.handleMouseUp)
        this.renderer.canvas.removeEventListener('contextmenu', this.disableContextMenu)
        window.removeEventListener('resize', this.handleResize)
    }

    private handleMouseDown(e: MouseEvent) {
        e.preventDefault()
        this._isMouseDown = true
        const screenPosition = this.getCoordinatesFromEvent(e)
        const imagePosition = this.camera.getImageCoordinates(screenPosition)
        const intersection = this.intersectScene(imagePosition)
        MouseDownStrategyProvider.get(e.button, intersection, this.mode)?.execute(intersection, this)
        this.renderer.render(this.scene, this.camera, this)
    }

    private handleMouseMove(e: MouseEvent) {
        e.preventDefault()
        if (this._isMouseDown) {
            const screenPosition = this.getCoordinatesFromEvent(e)
            const imagePosition = this.camera.getImageCoordinates(screenPosition)
            MouseMoveStrategyProvider.get(this.mode)?.execute(imagePosition, this)
            this.renderer.render(this.scene, this.camera, this)
        }
    }

    private handleMouseUp(e: MouseEvent) {
        e.preventDefault()
        this._isMouseDown = false
        MouseUpStrategyProvider.get(this.mode)?.execute(this)
        this.renderer.render(this.scene, this.camera, this)
    }

    private disableContextMenu(e: MouseEvent){
        e.preventDefault()
        return false
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

    get savedPosition() { return this._savedPosition }
    set savedPosition(position: Vector2) { this._savedPosition = position }

    get scene() { return this._scene }
    get renderer() { return this._renderer }
    get camera() { return this._camera }
}

export default Controller