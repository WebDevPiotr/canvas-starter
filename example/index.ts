import Matrix from '../src/Utils/Matrix3'
import Vector from '../src/Utils/Vector2'
import './index.css'
import exampleImage from './example.png'

const container: HTMLDivElement = document.querySelector('.canvasContainer')
const canvas: HTMLCanvasElement = document.createElement('canvas')
container.appendChild(canvas)
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

let zoomScalar: number = 1
let mouseDown: boolean = false
let image: HTMLImageElement;

let normalization: Matrix // from top/left coordinates to centralized coordinates
let localToGlobal: Matrix // click position on screen to position in image coordinates

let zoom: Matrix = Matrix.ones() // matrix represent zoom
let zoomInv: Matrix = Matrix.ones()

let translate: Matrix = Matrix.ones() // matrix represent translation
let savedTranslate: Matrix
let translateInv: Matrix = Matrix.ones()
let savedTranslateInv: Matrix = Matrix.ones()

let transform: Matrix   // screen * zoom * translete - without render becouse it will be used to calculate mouse position

let savedPosition: Vector

const handleMouseDown = (e: MouseEvent) => {
    mouseDown = true
    const screenPosition = getCoordinatesFromEvent(e)
    const imagePosition = screenPosition.transformWithMatrix(localToGlobal).transformWithMatrix(zoomInv).transformWithMatrix(translateInv)

    savedPosition = imagePosition.clone()
    savedTranslate = Matrix.fromValues(translate.values)
    savedTranslateInv = Matrix.fromValues(translateInv.values)

}

const handleMouseMove = (e: MouseEvent) => {
    if (mouseDown) {
        const screenPosition = getCoordinatesFromEvent(e)
        const imagePosition = screenPosition.transformWithMatrix(localToGlobal).transformWithMatrix(zoomInv).transformWithMatrix(savedTranslateInv)
        let difference = imagePosition.sub(savedPosition)

        translate = savedTranslate.translate(difference)
        transform = normalization.multiplyByMatrix(zoom).multiplyByMatrix(translate)

        draw()
    }
}

const handleMouseUp = () => {
    mouseDown = false
    let correction = calcCorrection(calcBbox())
    translate = translate.translate(new Vector(correction.x, correction.y))
    translateInv = translate.getInverseMatrix()
    transform = normalization.multiplyByMatrix(zoom).multiplyByMatrix(translate)
    draw()
}

const handleMouseScroll = (e: WheelEvent) => {

    if (e.deltaY > 0) zoomScalar = clamp(zoomScalar * 1.02, 1, 3)
    else zoomScalar = clamp(zoomScalar / 1.02, 1, 3)
    zoom = Matrix.fromValues([[zoomScalar, 0, 0], [0, zoomScalar, 0], [0, 0, 1]])
    zoomInv = zoom.getInverseMatrix()

    let correction = calcCorrection(calcBbox())
    translate = translate.translate(new Vector(correction.x, correction.y))
    translateInv = translate.getInverseMatrix()
    transform = normalization.multiplyByMatrix(zoom).multiplyByMatrix(translate)

    draw()
}

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
canvas.addEventListener('wheel', handleMouseScroll, false);

loadImage().then((img: HTMLImageElement) => {
    image = img
    canvas.width = img.width
    canvas.height = img.height
    const { width, height } = resizeCanvasToImage(container, image)
    normalization = Matrix.fromValues([[1, 0, img.width / 2], [0, -1, img.height / 2], [0, 0, 1]])
    let renderScale = Matrix.fromValues([[width / image.width, 0, 0], [0, height / img.height, 0], [0, 0, 1]])
    localToGlobal = renderScale.multiplyByMatrix(normalization).getInverseMatrix()
    transform = normalization
    draw()
})


function getCoordinatesFromEvent(e: MouseEvent) {
    return new Vector(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
}

function draw() {
    ctx.save()
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, image.width, image.height)

    let t = transform.values

    ctx.setTransform(t[0][0], t[1][0], t[0][1], t[1][1], t[0][2], t[1][2])
    ctx.scale(1, -1)
    ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height)
    ctx.restore()
}


function loadImage() {
    return new Promise(resolve => {
        var img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.src = exampleImage
    })
}

function resizeCanvasToImage(container: HTMLDivElement, img: HTMLImageElement) {
    const { clientHeight, clientWidth } = container
    const ratio = img.width / img.height
    let width, height;

    if (isContainerPanoramic(container)) {
        if (isImagePanoramic(img)) {
            if (clientWidth / ratio > clientHeight) {
                height = clientHeight
                width = clientHeight * ratio
            } else {
                height = clientWidth / ratio
                width = clientWidth
            }
        }
        else {
            height = clientHeight
            width = clientHeight * ratio
        }
    }
    else {
        if (isImagePanoramic(img)) {
            height = clientWidth / ratio
            width = clientWidth
        }
        else {
            if (clientHeight * ratio > clientWidth) {
                height = clientWidth / ratio
                width = clientWidth
            } else {
                height = clientHeight
                width = clientHeight * ratio
            }
        }
    }

    canvas.style.height = `${height}px`
    canvas.style.width = `${width}px`
    return { width, height }
}

function isContainerPanoramic(container: HTMLDivElement) {
    const { clientHeight, clientWidth } = container
    return clientWidth > clientHeight
}

function isImagePanoramic(img: HTMLImageElement) {
    const { height, width } = img
    return width > height
}

function clamp(x: number, min: number, max: number) {
    return Math.max(min, Math.min(x, max))
}

function calcBbox() {
    let width = image.width / zoomScalar
    let height = image.height / zoomScalar
    return {
        top: -translate.values[1][2] + height / 2,
        bottom: -translate.values[1][2] - height / 2,
        right: -translate.values[0][2] + width / 2,
        left: -translate.values[0][2] - width / 2,
    }
}

function calcCorrection({ top, bottom, left, right }: any) {
    let correction = { x: 0, y: 0 }
    if (top > image.height / 2) correction.y = top - image.height / 2
    if (bottom < -image.height / 2) correction.y = bottom + image.height / 2
    if (left < -image.width / 2) correction.x = left + image.width / 2
    if (right > image.width / 2) correction.x = right - image.width / 2
    return correction
}

document.querySelector('#plus').addEventListener('click', () => {
    zoomScalar = clamp(zoomScalar * 1.1, 1, 3)
    zoom = Matrix.fromValues([[zoomScalar, 0, 0], [0, zoomScalar, 0], [0, 0, 1]])
    zoomInv = zoom.getInverseMatrix()
    transform = normalization.multiplyByMatrix(zoom).multiplyByMatrix(translate)
    draw()
})

document.querySelector('#minus').addEventListener('click', () => {
    zoomScalar = clamp(zoomScalar / 1.1, 1, 3)
    zoom = Matrix.fromValues([[zoomScalar, 0, 0], [0, zoomScalar, 0], [0, 0, 1]])
    zoomInv = zoom.getInverseMatrix()
    transform = normalization.multiplyByMatrix(zoom).multiplyByMatrix(translate)
    draw()
})