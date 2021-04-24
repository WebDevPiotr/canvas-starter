import Scene from 'Core/Scene/Scene'

const image = new Image()
const image2 = new Image()

describe('Scene tests', () => {

    it('should create empty scene', () => {
        let scene = new Scene()
        expect(scene.layers.length).toBe(0)
    })

    // it('should add layer', () => {
    //     let scene = new Scene()
    //     scene.add(image)
    //     scene.add(image2)
    //     expect(scene.layers.length).toBe(2)
    //     expect(scene.layers.find(layer => layer.index === 1)).toBe(image)
    //     expect(scene.layers.find(layer => layer.index === 2)).toBe(image2)
    // })

    // it('should update layer', () => {
    //     let scene = new Scene()
    //     scene.add(image)
    //     scene.add(image2)
    //     expect(scene.layers.length).toBe(1)
    //     expect(scene.layers.get(5)).not.toBe(image)
    //     expect(scene.layers.get(5)).toBe(image2)
    // })

    // it('should remove layer', () => {
    //     let scene = new Scene()
    //     scene.add(image)
    //     scene.add(image2)
    //     scene.remove(image)
    //     expect(scene.layers.length).toBe(1)
    //     expect(scene.layers.get(1)).toBe(image)

    // })

})