import Matrix from '../src/Matrix'

describe('Matrix tests', () => {

    it('should cal correct determinant', () => {
        let determinant = Matrix.fromValues([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).getDeterminant()
        expect(determinant).toBe(-25)
    })

    it('should calc correct complement matrix', () => {
        let complementMatrix = Matrix.fromValues([[5, 2, 7], [5, 3, 6], [7, 8, 2]]).getComplementMatrix()
        let result = Matrix.fromValues([[-42, 32, 19], [52, -39, -26], [-9, 5, 5]])
        expect(complementMatrix).toEqual(result)
    })

    it('should calc correct transposed matrix', () => {
        let inverseMatrix = Matrix.fromValues([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).getTransposedMatrix()
        let result = Matrix.fromValues([[2, 6, 5], [5, 3, -2], [7, 4, -2]])
        expect(inverseMatrix).toEqual(result)
    })

    it('should calc correct transposed complement matrix', () => {
        let transposedComplementMatrix = Matrix.fromValues([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).getComplementMatrix().getTransposedMatrix()
        let result = Matrix.fromValues([[2, -4, -1], [32, -39, 34], [-27, 29, -24]])
        expect(transposedComplementMatrix).toEqual(result)
    })

    it('should correct multiply by matrix', () => {
        let matrix = Matrix.fromValues([[2, 5, 7], [6, 3, 4], [5, -2, -2]])
        let matrix2 = Matrix.fromValues([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
        let result = Matrix.fromValues([[71, 85, 99], [46, 59, 72], [-17, -16, -15]])
        expect(matrix.multiplyByMatrix(matrix2)).toEqual(result)
    })

    it('should correct multiply by scalar', () => {
        let multipliedMatrix = Matrix.fromValues([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).multiplyByScalar(5)
        let result = Matrix.fromValues([[10, 25, 35], [30, 15, 20], [25, -10, -10]])
        expect(multipliedMatrix).toEqual(result)
    })

    it('should calc correct inverse matrix', () => {
        let inverseMatrix = Matrix.fromValues([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).getInverseMatrix()
        let result = Matrix.fromValues([[-0.08, 0.16, 0.04], [-1.28, 1.56, -1.36], [1.08, -1.16, 0.96]])
        expect(inverseMatrix).toEqual(result)
    })

})