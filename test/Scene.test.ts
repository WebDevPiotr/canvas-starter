import Scene from '../src/Scene'

const image = new Image()
const image2 = new Image()

describe('Scene tests', () => {

    it('should create empty scene', () => {
        let scene = new Scene()
        expect(scene.layers.size).toBe(0)
    })

    it('should add layer', () => {
        let scene = new Scene()
        scene.add(image, 1)
        scene.add(image2, 2)
        expect(scene.layers.size).toBe(2)
        expect(scene.layers.get(1)).toBe(image)
        expect(scene.layers.get(2)).toBe(image2)
    })

    it('should update layer', () => {
        let scene = new Scene()
        scene.add(image, 5)
        scene.add(image2, 5)
        expect(scene.layers.size).toBe(1)
        expect(scene.layers.get(5)).not.toBe(image)
        expect(scene.layers.get(5)).toBe(image2)
    })

    it('should remove layer', () => {
        let scene = new Scene()
        scene.add(image, 1)
        scene.add(image2, 2)
        scene.remove(2)
        expect(scene.layers.size).toBe(1)
        expect(scene.layers.get(1)).toBe(image)

    })

})