import Matrix3 from '../src/Utils/Matrix3'
import Vector2 from '../src/Utils/Vector2'

describe('Matrix tests', () => {

    it('should create default matrix', () => {
        let matrix = new Matrix3()
        expect(matrix.values).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    })

    it('should create matrix with given values', () => {
        let matrix = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]])
        expect(matrix.values).toEqual([[2, 5, 7], [6, 3, 4], [5, -2, -2]])
    })

    it('should create matrix of ones', () => {
        let matrix = Matrix3.ones()
        expect(matrix.values).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    })

    it('should calculate translated matrix', () => {
        let matrix = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]])
        let vector = new Vector2(4, 8)
        let result = new Matrix3([[2, 5, 11], [6, 3, 12], [5, -2, -2]])
        expect(matrix.translate(vector)).toEqual(result)
    })

    it('should calculate determinant', () => {
        let determinant = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).getDeterminant()
        expect(determinant).toBe(-25)
    })

    it('should calculate complement matrix', () => {
        let complementMatrix = new Matrix3([[5, 2, 7], [5, 3, 6], [7, 8, 2]]).getComplementMatrix()
        let result = new Matrix3([[-42, 32, 19], [52, -39, -26], [-9, 5, 5]])
        expect(complementMatrix).toEqual(result)
    })

    it('should calculate transposed matrix', () => {
        let transposedMatrix = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).getTransposedMatrix()
        let result = new Matrix3([[2, 6, 5], [5, 3, -2], [7, 4, -2]])
        expect(transposedMatrix).toEqual(result)
    })

    it('should calculate inverse matrix', () => {
        let inverseMatrix = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).getInverseMatrix()
        let result = new Matrix3([[-0.08, 0.16, 0.04], [-1.28, 1.56, -1.36], [1.08, -1.16, 0.96]])
        expect(inverseMatrix).toEqual(result)
    })

    it('should multiply by matrix', () => {
        let matrix = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]])
        let matrix2 = new Matrix3([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
        let result = new Matrix3([[71, 85, 99], [46, 59, 72], [-17, -16, -15]])
        expect(matrix.multiplyByMatrix(matrix2)).toEqual(result)
    })

    it('should multiply by scalar', () => {
        let multipliedMatrix = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]]).multiplyByScalar(5)
        let result = new Matrix3([[10, 25, 35], [30, 15, 20], [25, -10, -10]])
        expect(multipliedMatrix).toEqual(result)
    })

})