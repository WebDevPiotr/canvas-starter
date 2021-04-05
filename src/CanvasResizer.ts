import Renderer from "./Renderer"
import Vector from "./Utils/Vector2"

class CanvasResizer {

    private renderer: Renderer

    constructor(renderer: Renderer) {
        this.renderer = renderer
    }

    public resize() {
        const containerSize: Vector = this.renderer.containerSize
        const canvasSize: Vector = this.renderer.size
        const ratio = canvasSize.x / canvasSize.y
        const isContainerPanoramic = this.isPanoramic(containerSize)
        const isCanvasPanoramic = this.isPanoramic(canvasSize)

        return ResizeStrategyProvider.get(isContainerPanoramic, isCanvasPanoramic).apply(containerSize, ratio)
    }

    private isPanoramic(size: Vector): boolean {
        return size.x > size.y
    }
}

export default CanvasResizer

type ResizeStrategy = (containerSize: Vector, ratio: number) => Vector

const containerPanoramicCanvasPanoramic: ResizeStrategy = (containerSize: Vector, ratio: number): Vector => {
    if (containerSize.x / ratio > containerSize.y)
        return new Vector(containerSize.y * ratio, containerSize.y)
    else
        return new Vector(containerSize.x, containerSize.x / ratio)
}

const containerPanoramicCanvasNotPanoramic: ResizeStrategy = (containerSize: Vector, ratio: number): Vector => {
    return new Vector(containerSize.y * ratio, containerSize.y)
}

const containerNotPanoramicCanvasPanoramic: ResizeStrategy = (containerSize: Vector, ratio: number): Vector => {
    return new Vector(containerSize.x, containerSize.x / ratio)
}

const containerNotPanoramicCanvasNotPanoramic: ResizeStrategy = (containerSize: Vector, ratio: number): Vector => {
    if (containerSize.y * ratio > containerSize.x)
        return new Vector(containerSize.x, containerSize.y / ratio)
    else
        return new Vector(containerSize.y * ratio, containerSize.y)
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
