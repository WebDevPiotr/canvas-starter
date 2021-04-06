import Matrix3 from '../src/Utils/Matrix3'
import Vector2 from '../src/Utils/Vector2'

describe('Vector tests', () => {

    it('should create default vector', () => {
        let vector = new Vector2()
        expect(vector.x).toBe(0)
        expect(vector.y).toBe(0)
    })

    it('should create vector with given coordinates', () => {
        let vector = new Vector2(6, 2)
        expect(vector.x).toBe(6)
        expect(vector.y).toBe(2)
    })

    it('should copy vector', () => {
        let vector = new Vector2(1, 2)
        let vector2 = vector.clone()
        expect(vector2).toEqual(vector)
        expect(vector2).not.toBe(vector)
    })

    it('should calculate subtraction', () => {
        let vector = new Vector2(1, 2)
        let vector2 = new Vector2(10, 5)
        let result = new Vector2(9, 3)
        expect(vector2.sub(vector)).toEqual(result)
    })

    it('should calculate correct transform', () => {
        let vector = new Vector2(1, 2)
        let matrix = new Matrix3([[2, 5, 7], [6, 3, 4], [5, -2, -2]])
        let result = new Vector2(19, 16)
        expect(vector.transformWithMatrix(matrix)).toEqual(result)
    })

})