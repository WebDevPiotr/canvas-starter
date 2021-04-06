import Camera from '../src/Camera'
import Vector2 from '../src/Utils/Vector2'
import Matrix3 from '../src/Utils/Matrix3'
import { parse } from './Utils'

describe('Camera tests', () => {

    const canvasSize = new Vector2(1000, 800)
    const renderSize = new Vector2(500, 400)
    const projection = new Matrix3([[1, 0, 1000 / 2], [0, -1, 800 / 2], [0, 0, 1]])
    let camera: Camera;

    beforeEach(() => {
        camera = new Camera()
        camera.setRenderMatrix(canvasSize, renderSize)
    })

    it('should init proper matrices', () => {
        const localToGlobal = new Matrix3([[2, 0, -500], [0, -2, 400], [0, 0, 1]])
        const render = new Matrix3([[1, 0, 1000 / 2], [0, -1, 800 / 2], [0, 0, 1]])
        expect(parse(camera.projection)).toEqual(projection)
        expect(parse(camera.localToGlobal)).toEqual(localToGlobal)
        expect(parse(camera.translate)).toEqual(Matrix3.ones())
        expect(parse(camera.translateInv)).toEqual(Matrix3.ones())
        expect(parse(camera.zoom)).toEqual(Matrix3.ones())
        expect(parse(camera.zoomInv)).toEqual(Matrix3.ones())
        expect(parse(camera.render)).toEqual(render)
    })

    it('should move camera', () => {
        camera.move(new Vector2(34, 372))
        const translate = new Matrix3([[1, 0, 34], [0, 1, 372], [0, 0, 1]])
        const render = projection.multiplyByMatrix(Matrix3.ones()).multiplyByMatrix(translate)
        expect(parse(camera.translate)).toEqual(translate)
        expect(parse(camera.translateInv)).toEqual(translate.getInverseMatrix())
        expect(parse(camera.render)).toEqual(render)
    })

    it('should zoom in camera', () => {
        camera.zoomIn()
        const zoom = new Matrix3([[1.1, 0, 0], [0, 1.1, 0], [0, 0, 1]])
        const render = projection.multiplyByMatrix(zoom).multiplyByMatrix(Matrix3.ones())
        expect(parse(camera.zoom)).toEqual(zoom)
        expect(parse(camera.zoomInv)).toEqual(zoom.getInverseMatrix())
        expect(parse(camera.render)).toEqual(render)
    })

    it('should clamp camera zoom >= 1', () => {
        camera.zoomOut()
        const zoom = new Matrix3([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
        const render = projection.multiplyByMatrix(zoom).multiplyByMatrix(Matrix3.ones())
        expect(parse(camera.zoom)).toEqual(zoom)
        expect(parse(camera.zoomInv)).toEqual(zoom.getInverseMatrix())
        expect(parse(camera.render)).toEqual(render)
    })

    it('should zoom out camera', () => {
        camera.zoomIn()
        camera.zoomIn()
        camera.zoomIn()
        camera.zoomOut()
        const zoom = new Matrix3([[1.1 * 1.1, 0, 0], [0, 1.1 * 1.1, 0], [0, 0, 1]])
        const render = projection.multiplyByMatrix(zoom).multiplyByMatrix(Matrix3.ones())
        expect(parse(camera.zoom)).toEqual(zoom)
        expect(parse(camera.zoomInv)).toEqual(zoom.getInverseMatrix())
        expect(parse(camera.render)).toEqual(render)
    })

    it('should keep camera inside image after move', () => {
        camera.move(new Vector2(10000, 10000))
        camera.checkViewport()
        const render = projection
        expect(parse(camera.translate)).toEqual(Matrix3.ones())
        expect(parse(camera.translateInv)).toEqual(Matrix3.ones())
        expect(parse(camera.render)).toEqual(render)
    })

    //TODO
    // it('should keep camera inside image after zoom out', () => {
    // })

})