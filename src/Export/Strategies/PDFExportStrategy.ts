import IExportStrategy from "Export/IExportStrategy";
import jsPDF from "jspdf";
import RenderStrategyProvider from 'Core/Resizer/ResizeStrategyProvider'
import Vector2 from "Utils/Vector2";

class PDFExportStrategy implements IExportStrategy {

    public execute(canvas: HTMLCanvasElement) {
        const img = canvas.toDataURL('image/jpeg')
        const pdf = new jsPDF(canvas.width >= canvas.height ? "landscape" : "portrait", "px", 'a4')
        const pdfSize = new Vector2(pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight())
        const imageSize = this.calcImageSize(canvas, pdfSize)
        const margin = this.calcMargin(imageSize, pdfSize)
        pdf.addImage(img, 'JPEG', margin.x, margin.y, imageSize.x, imageSize.y);
        pdf.save('Image.pdf');
    }

    private calcImageSize(canvas: HTMLCanvasElement, pdfSize: Vector2) {
        const canvasSize = new Vector2(canvas.width, canvas.height)
        return RenderStrategyProvider.get(pdfSize.x >= pdfSize.y, canvasSize.x >= canvasSize.y)(pdfSize, canvasSize, canvasSize.x / canvasSize.y)
    }

    private calcMargin(imageSize: Vector2, pdfSize: Vector2) {
        return new Vector2((pdfSize.x - imageSize.x) / 2, (pdfSize.y - imageSize.y) / 2)
    }
}

export default PDFExportStrategy