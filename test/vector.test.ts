import Matrix from '../src/Utils/Matrix'
import Vector from '../src/Utils/Vector'

describe('Vector tests', () => {

    it('should copy vector', () => {
        let vector = Vector.fromValues([1,2,3])
        let vector2 = vector.clone()
        expect(vector2).toEqual(vector)
        expect(vector2.values).toEqual(vector.values)
        expect(vector2).not.toBe(vector)
        expect(vector2.values).not.toBe(vector.values)
    })

    it('should calc difference', () => {
        let vector = Vector.fromValues([1,2,1])
        let vector2 = Vector.fromValues([10,5,1])
        let result = Vector.fromValues([9,3,1])
        expect(vector2.sub(vector)).toEqual(result)
    })


    it('should calc correct transform', () => {
        let vector = Vector.fromValues([1,2,3])
        let matrix = Matrix.fromValues([[2, 5, 7], [6, 3, 4], [5, -2, -2]])
        let result = Vector.fromValues([33, 24, -5])
        expect(vector.transformWithMatrix(matrix)).toEqual(result)
    })

})