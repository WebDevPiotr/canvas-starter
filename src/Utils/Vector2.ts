import Matrix3 from "Utils/Matrix3";

class Vector2 {

    private _x: number
    private _y: number
    private _length: number = 2

    constructor(x: number = 0, y: number = 0) {
        this._x = x
        this._y = y
    }

    public add(vector: Vector2) {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }

    public sub(vector: Vector2) {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }

    public divBy(factor: number) {
        return new Vector2(this.x / factor, this.y / factor)
    }

    public rotate(angle: number) {
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        let x = this.x * c - this.y * s
        let y = this.x * s + this.y * c
        return new Vector2(Number(x.toFixed(2)), Number(y.toFixed(2)))
    }

    public clone(): Vector2 {
        return new Vector2(this._x, this._y)
    }

    public rotateAboutOrigin(origin: Vector2, angle: number) {
        this.sub(origin)
        this.rotate(angle)
        this.add(origin)
        return this
    }

    public angleBetween(vector: Vector2) {
        return Math.atan2(this.y, this.x) - Math.atan2(vector.y, vector.x)
    }

    public transformWithMatrix(matrix: Matrix3) {
        const mV = matrix.values

        let x = this.x * mV[0][0] + this.y * mV[0][1] + mV[0][2]
        let y = this.x * mV[1][0] + this.y * mV[1][1] + mV[1][2]

        return new Vector2(x, y)
    }

    public isEmptyVector() {
        return this._x === 0 && this.y === 0
    }

    get x(): number { return this._x }
    get y(): number { return this._y }
    get length(): number { return this._length }

    set x(x: number) { this._x = x }
    set y(y: number) { this._y = y }

}

export default Vector2