import ExportTypes from 'Export/types'
import CanvasFacade from './CanvasFacade'
import './index.css'

const container: HTMLDivElement = document.querySelector('.canvasContainer')

const canvas = new CanvasFacade()
canvas.mount(container)

canvas.loadText({
    text: 'Test text',
    font: 'Arial',
    fill: 'black',
    size: 30,
    style: 'normal',
})

canvas.subscribe('select', (payload: any) => console.log(payload))

document.querySelector('#plus').addEventListener('click', () => {
    canvas.zoomIn()
})

document.querySelector('#minus').addEventListener('click', () => {
    canvas.zoomOut()
})

document.querySelector('#zapisz').addEventListener('click', () => {
    canvas.serialize()
})

document.querySelector('#eksportuj').addEventListener('click', () => {
    canvas.download(ExportTypes.PDF)
})

document.querySelector('#BACKGROUND').addEventListener('change', (e) => {
    canvas.loadBackground((e.target as HTMLInputElement).files[0])
})

document.querySelector('#IMAGE').addEventListener('change', (e) => {
    canvas.loadImage((e.target as HTMLInputElement).files[0])
})


document.querySelector('#JSON').addEventListener('change', (e) => {
    canvas.deserialize((e.target as HTMLInputElement).files[0])
})


export default CanvasFacade


//TODO check indicator clikc-box, too big