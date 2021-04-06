import CanvasFacade from './CanvasFacade'
import image from './example.png'
import './index.css'

const container: HTMLDivElement = document.querySelector('.canvasContainer')

const canvas = new CanvasFacade(container)
canvas.load(image, 1)

document.querySelector('#plus').addEventListener('click', () => {
    canvas.zoomIn()
})

document.querySelector('#minus').addEventListener('click', () => {
    canvas.zoomOut()
})

export default CanvasFacade