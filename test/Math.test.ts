import { clamp } from '../src/Utils/Math'

describe('Math tests', () => {

    it('should return unchanged value', () => {
        expect(clamp(10, 6, 12)).toBe(10)
    })

    it('should return minimum value', () => {
        expect(clamp(10, 15, 20)).toBe(15)
    })

    it('should return maximum value', () => {
        expect(clamp(10, 5, 8)).toBe(8)
    })

})