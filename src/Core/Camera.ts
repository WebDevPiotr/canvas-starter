import Matrix3 from 'Utils/Matrix3'
import Vector2 from 'Utils/Vector2'
import { clamp } from 'Utils/Math'

type Viewport = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

class Camera {

    private _projection: Matrix3 = Matrix3.ones()
    private _renderScale: Matrix3 = Matrix3.ones()
    private _renderScaleScalar: number
    private _localToGlobal: Matrix3 = Matrix3.ones()

    private _zoomScalar: number = 1
    private _zoom: Matrix3 = Matrix3.ones()
    private _zoomInv: Matrix3 = Matrix3.ones()

    private _translate: Matrix3 = Matrix3.ones()
    private _translateInv: Matrix3 = Matrix3.ones()

    private _render: Matrix3 = Matrix3.ones()

    private _viewport: Viewport
    private _canvasSize: Vector2

    public setRenderMatrix(canvasSize: Vector2, renderSize: Vector2) {
        this._canvasSize = canvasSize
        this._projection = new Matrix3([[1, 0, canvasSize.x / 2], [0, -1, canvasSize.y / 2], [0, 0, 1]])
        this._renderScale = new Matrix3([[renderSize.x / canvasSize.x, 0, 0], [0, renderSize.y / canvasSize.y, 0], [0, 0, 1]])
        this._renderScaleScalar = renderSize.x / canvasSize.x
        this._localToGlobal = this._renderScale.multiplyByMatrix(this._projection).getInverseMatrix()
        this.update()
    }

    public move(vector: Vector2) {
        this.updateTranslateMatrix(vector)
    }

    public setZoom(zoom: number) {
        this._zoomScalar = clamp(zoom, 1, 3)
        this.updateZoomMatrix()
        this.keepInsideCanvas()
    }

    public zoomIn() {
        this._zoomScalar = clamp(this._zoomScalar * 1.1, 1, 3)
        this.updateZoomMatrix()
        this.keepInsideCanvas()
    }

    public zoomOut() {
        this._zoomScalar = clamp(this._zoomScalar / 1.1, 1, 3)
        this.updateZoomMatrix()
        this.keepInsideCanvas()
    }

    public getImageCoordinates(screenCoordinates: Vector2): Vector2 {
        return screenCoordinates.clone().transformWithMatrix(this._localToGlobal).transformWithMatrix(this._zoomInv).transformWithMatrix(this._translateInv)
    }

    private update() {
        this._render = this._projection.multiplyByMatrix(this._zoom).multiplyByMatrix(this._translate)
        this.updateViewport()
    }

    private updateZoomMatrix() {
        this._zoom = new Matrix3([[this._zoomScalar, 0, 0], [0, this._zoomScalar, 0], [0, 0, 1]])
        this._zoomInv = this._zoom.getInverseMatrix()
        this.update()
    }

    private updateTranslateMatrix(vector: Vector2) {
        this._translate = this._translate.translate(vector)
        this._translateInv = this._translate.getInverseMatrix()
        this.update()
    }

    private updateViewport() {
        const width = this._canvasSize.x / this._zoomScalar
        const height = this._canvasSize.y / this._zoomScalar
        this._viewport = {
            top: -this._translate.values[1][2] + height / 2,
            bottom: -this._translate.values[1][2] - height / 2,
            right: -this._translate.values[0][2] + width / 2,
            left: -this._translate.values[0][2] - width / 2,
        }
    }

    private getCameraCorrection() {
        const { top, bottom, left, right } = this._viewport
        const correction = new Vector2()
        if (top > this._canvasSize.y / 2) correction.y = top - this._canvasSize.y / 2
        if (bottom < -this._canvasSize.y / 2) correction.y = bottom + this._canvasSize.y / 2
        if (left < -this._canvasSize.x / 2) correction.x = left + this._canvasSize.x / 2
        if (right > this._canvasSize.x / 2) correction.x = right - this._canvasSize.x / 2
        return correction
    }

    public keepInsideCanvas() {
        const correction = this.getCameraCorrection()
        if (!correction.isEmptyVector()) {
            this.updateTranslateMatrix(correction)
        }
    }

    public calcSizeScale(): number {
        const { renderScale, zoomScalar } = this
        if (this._canvasSize.y >= this._canvasSize.x) return 1 / renderScale.values[1][1] / zoomScalar
        else return 1 / renderScale.values[0][0] / zoomScalar
    }

    get projection(): Matrix3 { return this._projection }
    get renderScale(): Matrix3 { return this._renderScale }
    get localToGlobal(): Matrix3 { return this._localToGlobal }
    get render(): Matrix3 { return this._render }

    get translate(): Matrix3 { return this._translate }
    get translateInv(): Matrix3 { return this._translateInv }

    get zoom(): Matrix3 { return this._zoom }
    get zoomInv(): Matrix3 { return this._zoomInv }
    get zoomScalar(): number { return this._zoomScalar }
    get renderScaleScalar(): number { return this._renderScaleScalar }

}

export default Camera