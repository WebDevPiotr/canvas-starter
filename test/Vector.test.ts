import Matrix3 from 'Utils/Matrix3'
import Vector2 from 'Utils/Vector2'

describe('Vector2 tests', () => {

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


describe('Vector2 tests', () => {


    it('Check rotation (0,0)', () => {
        let vector = new Vector2(5, 5)
        let origin = new Vector2(0, 0)
        let angle = Math.PI / 2
        let newVector = vector.rotateAboutOrigin(origin, angle)
        expect(newVector).toEqual(new Vector2(-5, 5))
    })

    it('Check rotation about origin (1 quarter)', () => {
        let vector = new Vector2(10, 7)
        let origin = new Vector2(5, 7)
        let angle = Math.PI / 2
        let newVector = vector.rotateAboutOrigin(origin, angle)
        expect(newVector).toEqual(new Vector2(5, 12))
    })

    it('Check rotation about origin (2 quarter)', () => {
        let vector = new Vector2(10, 7)
        let origin = new Vector2(5, 7)
        let angle = 3 * Math.PI / 4
        let newVector = vector.rotateAboutOrigin(origin, angle)
        expect(newVector).toEqual(new Vector2(1.46, 10.54))
    })

    it('Check rotation about origin (3 quarter)', () => {
        let vector = new Vector2(10, 7)
        let origin = new Vector2(5, 7)
        let angle = 5 * Math.PI / 4
        let newVector = vector.rotateAboutOrigin(origin, angle)
        expect(newVector).toEqual(new Vector2(1.46, 3.46))
    })

    it('Check rotation about origin (4 quarter)', () => {
        let vector = new Vector2(10, 7)
        let origin = new Vector2(5, 7)
        let angle = 7 * Math.PI / 4
        let newVector = vector.rotateAboutOrigin(origin, angle)
        expect(newVector).toEqual(new Vector2(8.54, 3.46))
    })

    it('Check rotation about origin (PI)', () => {
        let vector = new Vector2(10, 7)
        let origin = new Vector2(5, 7)
        let angle = Math.PI 
        let newVector = vector.rotateAboutOrigin(origin, angle)
        expect(newVector).toEqual(new Vector2(0, 7))
    })

    it('Check rotation about origin (negative angle)', () => {
        let vector = new Vector2(10, 7)
        let origin = new Vector2(5, 7)
        let angle = - Math.PI /4 
        let newVector = vector.rotateAboutOrigin(origin, angle)
        expect(newVector).toEqual(new Vector2(8.54, 3.46))
    })

    it('Check calc angle between', () => {
        let vectorFrom = new Vector2(5, 0)
        let vectorTo = new Vector2(0, 5)
        let angle = vectorTo.angleBetween(vectorFrom)
        expect(angle).toEqual(Math.PI/2)
    })

})