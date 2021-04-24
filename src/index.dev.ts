import CanvasFacade from './CanvasFacade'
import './index.css'

const container: HTMLDivElement = document.querySelector('.canvasContainer')

const canvas = new CanvasFacade(container)

document.querySelector('#plus').addEventListener('click', () => {
    canvas.zoomIn()
})

document.querySelector('#minus').addEventListener('click', () => {
    canvas.zoomOut()
})

document.querySelector('#BACKGROUND').addEventListener('change', (e) => {
    canvas.loadBackground((e.target as HTMLInputElement).files[0])
})

document.querySelector('#IMAGE').addEventListener('change', (e) => {
    canvas.loadImage((e.target as HTMLInputElement).files[0])
})

document.querySelector('#BORDER').addEventListener('change', (e) => {
    canvas.loadBorder((e.target as HTMLInputElement).files[0])
})


export default CanvasFacade