import CanvasResizer from 'Core/CanvasResizer'
import Vector2 from 'Utils/Vector2'

describe('Resizer tests', () => {

    it('should resize panoramic image to fit panoramic container width', () => {
        const renderer: any = { size: new Vector2(500, 300), containerSize: new Vector2(700, 500) };
        const resizer = new CanvasResizer(renderer)
        const result = resizer.resize()
        expect(result).toEqual(new Vector2(700, 420))
    })

    it('should resize panoramic image to fit panoramic container height', () => {
        const renderer: any = { size: new Vector2(500, 400), containerSize: new Vector2(700, 500) };
        const resizer = new CanvasResizer(renderer)
        const result = resizer.resize()
        expect(result).toEqual(new Vector2(625, 500))
    })

    it('should resize not panoramic image to fit not panoramic container height', () => {
        const renderer: any = { size: new Vector2(600, 800), containerSize: new Vector2(1000, 1200) };
        const resizer = new CanvasResizer(renderer)
        const result = resizer.resize()
        expect(result).toEqual(new Vector2(900, 1200))
    })

    it('should resize not panoramic image to fit not panoramic container width', () => {
        const renderer: any = { size: new Vector2(600, 750), containerSize: new Vector2(800, 1200) };
        const resizer = new CanvasResizer(renderer)
        const result = resizer.resize()
        expect(result).toEqual(new Vector2(800, 1000))
    })

    it('should resize panoramic image to fit not panoramic container width', () => {
        const renderer: any = { size: new Vector2(800, 600), containerSize: new Vector2(400, 700) };
        const resizer = new CanvasResizer(renderer)
        const result = resizer.resize()
        expect(result).toEqual(new Vector2(400, 300))
    })

    it('should resize not panoramic image to fit panoramic container width', () => {
        const renderer: any = { size: new Vector2(600, 900), containerSize: new Vector2(800, 600) };
        const resizer = new CanvasResizer(renderer)
        const result = resizer.resize()
        expect(result).toEqual(new Vector2(400, 600))
    })
})