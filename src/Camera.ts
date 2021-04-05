import Matrix from './Utils/Matrix3'
import Vector from './Utils/Vector2'
import { clamp } from './Utils/Math'

type Viewport = {
    top: number,
    bottom: number,
    left: number,
    right: number
}

class Camera {

    private _zoomScalar: number

    private _normalization: Matrix
    private _localToGlobal: Matrix

    private _zoom: Matrix = Matrix.ones()
    private _zoomInv: Matrix = Matrix.ones()

    private _translate: Matrix = Matrix.ones()
    private _translateInv: Matrix = Matrix.ones()

    private _transform: Matrix

    private _canvasSize: Vector

    public setRenderMatrix(canvasSize: Vector, renderSize: Vector) {
        this._canvasSize = canvasSize
        this._normalization = Matrix.fromValues([[1, 0, canvasSize.x / 2], [0, -1, canvasSize.y / 2], [0, 0, 1]])
        let renderScale = Matrix.fromValues([[renderSize.x / canvasSize.x, 0, 0], [0, renderSize.y / canvasSize.y, 0], [0, 0, 1]])
        this._localToGlobal = renderScale.multiplyByMatrix(this._normalization).getInverseMatrix()
        this.update()
    }

    public move(vector: Vector) {
        this._translate = this._translate.translate(vector)
        this._translateInv = this._translate.getInverseMatrix()
        this.update()
    }

    public zoomIn() {
        this._zoomScalar = clamp(this._zoomScalar * 1.1, 1, 3)
        this._zoom = Matrix.fromValues([[this._zoomScalar, 0, 0], [0, this._zoomScalar, 0], [0, 0, 1]])
        this._zoomInv = this._zoom.getInverseMatrix()
        this.update()
        this.checkViewport()
    }

    public zoomOut() {
        this._zoomScalar = clamp(this._zoomScalar * 1.1, 1, 3)
        this._zoom = Matrix.fromValues([[this._zoomScalar, 0, 0], [0, this._zoomScalar, 0], [0, 0, 1]])
        this._zoomInv = this._zoom.getInverseMatrix()
        this.update()
        this.checkViewport()
    }

    public getImageCoordinates(screenCoordinates: Vector): Vector {
        return screenCoordinates.transformWithMatrix(this._localToGlobal).transformWithMatrix(this._zoomInv).transformWithMatrix(this._translateInv)
    }

    public checkViewport() {
        const correction = this.calcCorrection()
        this.move(correction)
    }

    private update() {
        this._transform = this._normalization.multiplyByMatrix(this._zoom).multiplyByMatrix(this._translate)
    }

    private calcCorrection() {
        const { top, bottom, left, right } = this.calcViewport()
        let correction = new Vector()
        if (top > this._canvasSize.y / 2) correction.y = top - this._canvasSize.y / 2
        if (bottom < -this._canvasSize.y / 2) correction.y = bottom + this._canvasSize.y / 2
        if (left < -this._canvasSize.x / 2) correction.x = left + this._canvasSize.x / 2
        if (right > this._canvasSize.x / 2) correction.x = right - this._canvasSize.x / 2
        return correction
    }

    private calcViewport(): Viewport {
        let width = this._canvasSize.x / this._zoomScalar
        let height = this._canvasSize.y / this._zoomScalar
        return {
            top: -this._translate.values[1][2] + height / 2,
            bottom: -this._translate.values[1][2] - height / 2,
            right: -this._translate.values[0][2] + width / 2,
            left: -this._translate.values[0][2] - width / 2,
        }
    }

    get translate(): Matrix { return this._translate }
    get translateInv(): Matrix { return this._translateInv }
}

export default Camera