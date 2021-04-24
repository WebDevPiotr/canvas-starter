import Vector2 from "Utils/Vector2";

class Matrix3 {

    private _values: Array<Array<number>>;
    private _rows: number = 3
    private _columns: number = 3

    constructor(values?: Array<Array<number>>){
        this._values = values || Array.from({ length: this._rows }, () => new Array(this._columns).fill(0));
    }

    public static ones(){
        return new Matrix3([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    }

    public multiplyByMatrix(matrix: Matrix3) {

        if (this.columns !== matrix.rows) throw Error("Wrong dimensions of matrices")

        const result = new Matrix3();
        const aV = this.values
        const bV = matrix.values

        result.values[0][0] = aV[0][0] * bV[0][0] + aV[0][1] * bV[1][0] + aV[0][2] * bV[2][0];
        result.values[0][1] = aV[0][0] * bV[0][1] + aV[0][1] * bV[1][1] + aV[0][2] * bV[2][1];
        result.values[0][2] = aV[0][0] * bV[0][2] + aV[0][1] * bV[1][2] + aV[0][2] * bV[2][2];

        result.values[1][0] = aV[1][0] * bV[0][0] + aV[1][1] * bV[1][0] + aV[1][2] * bV[2][0];
        result.values[1][1] = aV[1][0] * bV[0][1] + aV[1][1] * bV[1][1] + aV[1][2] * bV[2][1];
        result.values[1][2] = aV[1][0] * bV[0][2] + aV[1][1] * bV[1][2] + aV[1][2] * bV[2][2];

        result.values[2][0] = aV[2][0] * bV[0][0] + aV[2][1] * bV[1][0] + aV[2][2] * bV[2][0];
        result.values[2][1] = aV[2][0] * bV[0][1] + aV[2][1] * bV[1][1] + aV[2][2] * bV[2][1];
        result.values[2][2] = aV[2][0] * bV[0][2] + aV[2][1] * bV[1][2] + aV[2][2] * bV[2][2];

        return result;

    }

    public multiplyByScalar(scalar: number) {

        const result = new Matrix3();
        const aV = this.values

        result.values[0][0] = aV[0][0] * scalar
        result.values[0][1] = aV[0][1] * scalar
        result.values[0][2] = aV[0][2] * scalar

        result.values[1][0] = aV[1][0] * scalar
        result.values[1][1] = aV[1][1] * scalar
        result.values[1][2] = aV[1][2] * scalar

        result.values[2][0] = aV[2][0] * scalar
        result.values[2][1] = aV[2][1] * scalar
        result.values[2][2] = aV[2][2] * scalar

        return result;

    }

    public getInverseMatrix() {
        const transposedComplementMatrix = this.getComplementMatrix().getTransposedMatrix()
        const determinant = this.getDeterminant()

        if (determinant === 0) return new Matrix3();
        return transposedComplementMatrix.multiplyByScalar(1 / determinant)
    }

    public getComplementMatrix() {
        const result = new Matrix3();
        const aV = this.values

        result.values[0][0] = aV[1][1] * aV[2][2] - aV[1][2] * aV[2][1]
        result.values[0][1] = aV[2][0] * aV[1][2] - aV[1][0] * aV[2][2]
        result.values[0][2] = aV[1][0] * aV[2][1] - aV[1][1] * aV[2][0]

        result.values[1][0] = aV[0][2] * aV[2][1] - aV[0][1] * aV[2][2]
        result.values[1][1] = aV[0][0] * aV[2][2] - aV[0][2] * aV[2][0]
        result.values[1][2] = aV[0][1] * aV[2][0] - aV[0][0] * aV[2][1]

        result.values[2][0] = aV[0][1] * aV[1][2] - aV[0][2] * aV[1][1]
        result.values[2][1] = aV[0][2] * aV[1][0] - aV[0][0] * aV[1][2]
        result.values[2][2] = aV[0][0] * aV[1][1] - aV[0][1] * aV[1][0]

        return result
    }

    public getTransposedMatrix() {
        const result = new Matrix3();
        const aV = this.values

        result.values[0][0] = aV[0][0] 
        result.values[0][1] = aV[1][0] 
        result.values[0][2] = aV[2][0]

        result.values[1][0] = aV[0][1] 
        result.values[1][1] = aV[1][1] 
        result.values[1][2] = aV[2][1] 

        result.values[2][0] = aV[0][2] 
        result.values[2][1] = aV[1][2] 
        result.values[2][2] = aV[2][2]

        return result
    }

    public getDeterminant() {
        const aV = this.values
        return (
            (aV[0][0] * aV[1][1] * aV[2][2] + aV[0][1] * aV[1][2] * aV[2][0] + aV[0][2] * aV[1][0] * aV[2][1]) -
            (aV[0][2] * aV[1][1] * aV[2][0] + aV[0][0] * aV[1][2] * aV[2][1] + aV[0][1] * aV[1][0] * aV[2][2])
        )
    }

    public translate(vector: Vector2){
        const result = new Matrix3(this.values);

        result.values[0][2] += vector.x
        result.values[1][2] += vector.y
            
        return result
    }

    get values(): Array<Array<number>> { return this._values }
    get rows(): number { return this._rows }
    get columns(): number { return this._columns }

}

export default Matrix3