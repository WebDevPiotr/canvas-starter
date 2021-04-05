import Vector from "./Vector2";

class Matrix {

    private _values: Array<Array<number>>;
    private _rows: number
    private _columns: number

    public static fromDimensions(rows: number, columns: number) {
        const matrix = new Matrix()
        matrix._values = Array.from({ length: rows }, () => new Array(columns).fill(0));
        matrix._rows = rows
        matrix._columns = columns
        return matrix
    }

    public static fromValues(values: Array<Array<number>>) {
        const matrix = Matrix.fromDimensions(values.length, values[0].length)

        matrix.values[0][0] = values[0][0]
        matrix.values[0][1] = values[0][1]
        matrix.values[0][2] = values[0][2]

        matrix.values[1][0] = values[1][0]
        matrix.values[1][1] = values[1][1]
        matrix.values[1][2] = values[1][2]

        matrix.values[2][0] = values[2][0]
        matrix.values[2][1] = values[2][1]
        matrix.values[2][2] = values[2][2]

        matrix._rows = values.length
        matrix._columns = values[0].length
        return matrix
    }

    public static ones(){
        return Matrix.fromValues([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    }

    public multiplyByMatrix(matrix: Matrix) {

        if (this.columns !== matrix.rows) throw Error("Wrong dimensions of matrices")

        const result = Matrix.fromDimensions(this.rows, this.columns);
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

        const result = Matrix.fromDimensions(this.rows, this.columns);
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

        if (determinant === 0) return Matrix.fromDimensions(this.rows, this.columns);
        return transposedComplementMatrix.multiplyByScalar(1 / determinant)
    }

    public getComplementMatrix() {
        const result = Matrix.fromDimensions(this.rows, this.columns);
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
        const result = Matrix.fromDimensions(this.rows, this.columns);
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

    public translate(vector: Vector){
        const result = Matrix.fromValues(this.values);

        result.values[0][2] += vector.x
        result.values[1][2] += vector.y
            
        return result
    }

    get values(): Array<Array<number>> { return this._values }
    get rows(): number { return this._rows }
    get columns(): number { return this._columns }

}

export default Matrix