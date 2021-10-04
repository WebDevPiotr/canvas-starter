export type TextConfig = {
    text: string,
    font: string,
    fill: string,
    stroke?: string,
    size: number,
    style: string,
    strokeWidth?: number
}

function TextToImage(config: TextConfig, scale: number): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const size = config.size/scale

        context.font = `${config.style} ${size}px ${config.font}`;
        const width = context.measureText(config.text).width
        canvas.width = width
        canvas.height = size
        context.clearRect(0, 0, canvas.width, canvas.height)

        context.font = `${config.style} ${size}px ${config.font}`;
        context.fillStyle = config.fill;
        context.strokeStyle = config.stroke ?? config.fill
        context.lineWidth = 2
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.strokeText(config.text, width / 2, size/2);
        context.fillText(config.text, width / 2, size/2);

        const image = new Image(width, size)
        image.src = canvas.toDataURL('image/png')
        image.addEventListener('load', () => resolve(image))
    })
}

export default TextToImage