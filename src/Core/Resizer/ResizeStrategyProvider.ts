import Vector2 from "Utils/Vector2"

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

export default ResizeStrategyProvider

type ResizeStrategy = (containerSize: Vector2, canvasSize: Vector2, ratio: number) => Vector2

const containerPanoramicCanvasPanoramic: ResizeStrategy = (containerSize: Vector2, canvasSize: Vector2, ratio: number): Vector2 => {
    if (containerSize.x / ratio >= containerSize.y) {
        let maxHeihgt = Math.min(containerSize.y, canvasSize.y)
        return new Vector2(maxHeihgt * ratio, maxHeihgt)
    }
    else {
        let maxWidth = Math.min(containerSize.x, canvasSize.x)
        return new Vector2(maxWidth, maxWidth / ratio)
    }
}

const containerPanoramicCanvasNotPanoramic: ResizeStrategy = (containerSize: Vector2, canvasSize: Vector2, ratio: number): Vector2 => {
    let maxHeihgt = Math.min(containerSize.y, canvasSize.y)
    return new Vector2(maxHeihgt * ratio, maxHeihgt)
}

const containerNotPanoramicCanvasPanoramic: ResizeStrategy = (containerSize: Vector2, canvasSize: Vector2, ratio: number): Vector2 => {
    let maxWidth = Math.min(containerSize.x, canvasSize.x)
    return new Vector2(maxWidth, maxWidth / ratio)
}

const containerNotPanoramicCanvasNotPanoramic: ResizeStrategy = (containerSize: Vector2, canvasSize: Vector2, ratio: number): Vector2 => {
    if (containerSize.y * ratio >= containerSize.x) {
        let maxWidth = Math.min(containerSize.x, canvasSize.x)
        return new Vector2(maxWidth, maxWidth / ratio)
    }
    else {
        let maxHeihgt = Math.min(containerSize.y, canvasSize.y)
        return new Vector2(maxHeihgt * ratio, maxHeihgt)
    }
}

