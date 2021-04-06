import Matrix3 from "./Matrix3";

class Vector {

    private _x: number
    private _y: number
    private _length: number = 2

    constructor(x: number = 0, y: number = 0) {
        this._x = x
        this._y = y
    }

    public sub(vector: Vector) {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    public clone(): Vector {
        return new Vector(this._x, this._y)
    }

    public transformWithMatrix(matrix: Matrix3) {
        const mV = matrix.values

        let x = this.x * mV[0][0] + this.y * mV[0][1] + mV[0][2]
        let y = this.x * mV[1][0] + this.y * mV[1][1] + mV[1][2]

        return new Vector(x, y)
    }

    get x(): number { return this._x }
    get y(): number { return this._y }
    get length(): number { return this._length }

    set x(x: number) { this._x = x }
    set y(y: number) { this._y = y }

}

export default Vector