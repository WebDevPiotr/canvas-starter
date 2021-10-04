import Renderer from "Core/Renderer"
import Vector2 from "Utils/Vector2"
import ResizeStrategyProvider from './ResizeStrategyProvider'

class CanvasResizer {

    private renderer: Renderer

    constructor(renderer: Renderer) {
        this.renderer = renderer
    }

    public resize() {
        const containerSize: Vector2 = this.renderer.containerSize
        const canvasSize: Vector2 = this.renderer.size
        const ratio = canvasSize.x / canvasSize.y
        const isContainerPanoramic = this.isPanoramic(containerSize)
        const isCanvasPanoramic = this.isPanoramic(canvasSize)

        return ResizeStrategyProvider.get(isContainerPanoramic, isCanvasPanoramic)(containerSize, canvasSize, ratio)
    }

    private isPanoramic(size: Vector2): boolean {
        return size.x >= size.y
    }
}

export default CanvasResizer


