import Renderer from "./Renderer"
import Vector2 from "./Utils/Vector2"

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

        return ResizeStrategyProvider.get(isContainerPanoramic, isCanvasPanoramic)(containerSize, ratio)
    }

    private isPanoramic(size: Vector2): boolean {
        return size.x > size.y
    }
}

export default CanvasResizer

type ResizeStrategy = (containerSize: Vector2, ratio: number) => Vector2

const containerPanoramicCanvasPanoramic: ResizeStrategy = (containerSize: Vector2, ratio: number): Vector2 => {
    if (containerSize.x / ratio > containerSize.y)
        return new Vector2(containerSize.y * ratio, containerSize.y)
    else
        return new Vector2(containerSize.x, containerSize.x / ratio)
}

const containerPanoramicCanvasNotPanoramic: ResizeStrategy = (containerSize: Vector2, ratio: number): Vector2 => {
    return new Vector2(containerSize.y * ratio, containerSize.y)
}

const containerNotPanoramicCanvasPanoramic: ResizeStrategy = (containerSize: Vector2, ratio: number): Vector2 => {
    return new Vector2(containerSize.x, containerSize.x / ratio)
}

const containerNotPanoramicCanvasNotPanoramic: ResizeStrategy = (containerSize: Vector2, ratio: number): Vector2 => {
    if (containerSize.y * ratio > containerSize.x)
        return new Vector2(containerSize.x, containerSize.y / ratio)
    else
        return new Vector2(containerSize.y * ratio, containerSize.y)
}

class ResizeStrategyProvider {

    public static get(isContainerPanoramic: boolean, isCanvasPanoramic: boolean): ResizeStrategy {
        if (isContainerPanoramic) {
            if (isCanvasPanoramic) return containerPanoramicCanvasPanoramic
            else return containerPanoramicCanvasNotPanoramic
        }
        else {
            if (isCanvasPanoramic) return containerNotPanoramicCanvasPanoramic
            else return containerNotPanoramicCanvasNotPanoramic
        }
    }
}
