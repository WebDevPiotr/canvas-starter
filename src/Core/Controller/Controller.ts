import Vector2 from 'Utils/Vector2'
import Renderer from 'Core/Renderer'
import Camera from 'Core/Camera'
import CanvasResizer from 'Core/Resizer/CanvasResizer'
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
import EventEmitter from 'EventEmitter/EventEmitter'

class Controller {

    private _scene: Scene
    private _renderer: Renderer
    private _camera: Camera
    private _eventEmitter: EventEmitter
    private _resizer: CanvasResizer

    private _isMouseDown: boolean = false
    private _savedPosition: Vector2

    private _mode: ControllerModeType = ControllerModeType.UNSELECTED
    private _selectedElement: MoveableElement
    private _selectionIndicator: SelectionIndicator
    private _markingBox: MarkingBox
    private _touchTimer: any

    constructor(scene: Scene, renderer: Renderer, camera: Camera, eventEmitter: EventEmitter) {
        this._scene = scene
        this._renderer = renderer
        this._camera = camera
        this._eventEmitter = eventEmitter
        this._resizer = new CanvasResizer(this.renderer)

        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.disableContextMenu = this.disableContextMenu.bind(this)
        this.handleMouseDoubleClick = this.handleMouseDoubleClick.bind(this)
    }

    public init() {
        this.renderer.canvas.addEventListener('mousedown', this.handleMouseDown)
        this.renderer.canvas.addEventListener('mousemove', this.handleMouseMove)
        this.renderer.canvas.addEventListener('mouseup', this.handleMouseUp)
        this.renderer.canvas.addEventListener('touchstart', this.handleTouchStart)
        this.renderer.canvas.addEventListener('touchmove', this.handleTouchMove)
        this.renderer.canvas.addEventListener('touchend', this.handleTouchEnd)
        this.renderer.canvas.addEventListener('contextmenu', this.disableContextMenu)
        this.renderer.canvas.addEventListener('dblclick', this.handleMouseDoubleClick)
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }

    public stop() {
        this.renderer.canvas.removeEventListener('mousedown', this.handleMouseDown)
        this.renderer.canvas.removeEventListener('mousemove', this.handleMouseMove)
        this.renderer.canvas.removeEventListener('mouseup', this.handleMouseUp)
        this.renderer.canvas.removeEventListener('contextmenu', this.disableContextMenu)
        this.renderer.canvas.removeEventListener('dblclick', this.handleMouseDoubleClick)
        window.removeEventListener('resize', this.handleResize)
    }

    private handleMouseDown(e: MouseEvent) {
        e.preventDefault()
        this._isMouseDown = true
        const imagePosition = this.getCoordinatesFromEvent(e)
        const intersection = this.intersectScene(imagePosition)
        MouseDownStrategyProvider.get(e.button, intersection, this.mode)?.execute(this, intersection)
        this.renderer.render(this.scene, this.camera, this)
    }

    private handleMouseMove(e: MouseEvent) {
        e.preventDefault()
        if (this._isMouseDown) {
            const imagePosition = this.getCoordinatesFromEvent(e)
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

    private handleTouchStart(e: TouchEvent) {
        e.preventDefault()
        this._isMouseDown = true
        const imagePosition = this.getCoordinatesFromEvent(e.changedTouches[0])
        const intersection = this.intersectScene(imagePosition)
        if (intersection.element) this._touchTimer = setTimeout(() => this._eventEmitter.emit('selectTouch', {}), 1000);
        if (!intersection.element) this._eventEmitter.emit('deselect', {});
        MouseDownStrategyProvider.get(1, intersection, this.mode)?.execute(this, intersection)
        this.renderer.render(this.scene, this.camera, this)
    }

    private handleTouchMove(e: TouchEvent) {
        e.preventDefault()
        if (this._isMouseDown) {
            const imagePosition = this.getCoordinatesFromEvent(e.changedTouches[0])
            MouseMoveStrategyProvider.get(this.mode)?.execute(imagePosition, this)
            this.renderer.render(this.scene, this.camera, this)
        }
    }

    private handleTouchEnd(e: TouchEvent) {
        e.preventDefault()
        if (this._touchTimer) clearTimeout(this._touchTimer);
        this._isMouseDown = false
        MouseUpStrategyProvider.get(this.mode)?.execute(this)
        this.renderer.render(this.scene, this.camera, this)
    }

    private disableContextMenu(e: MouseEvent) {
        e.preventDefault()
        return false
    }

    private handleMouseDoubleClick(e: MouseEvent) {
        const imagePosition = this.getCoordinatesFromEvent(e)
        const intersection = this.intersectScene(imagePosition)
        if (intersection.element) this._eventEmitter.emit('select', { x: e.pageX, y: e.pageY })
    }

    public handleResize() {
        const size: Vector2 = this._resizer.resize()
        this.renderer.setRenderSize(size)
        this.camera.setRenderMatrix(this.renderer.size, size)
    }

    private getCoordinatesFromEvent(e: any) {
        const canvas = this.renderer.canvas
        const screenPosition = new Vector2(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
        return this.camera.getImageCoordinates(screenPosition)
    }

    private intersectScene(mousePos: Vector2): Intersection {
        const scale = this._camera.calcSizeScale()
        return new CanvasInspector().findClickedElement(mousePos, this.scene.layers, this, scale)
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