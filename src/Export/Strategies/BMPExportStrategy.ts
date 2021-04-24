import IExportStrategy from "Export/IExportStrategy";
import BMPExporter from 'Utils/BMPExporter'

class BMPExportStrategy implements IExportStrategy {

    public execute(canvas: HTMLCanvasElement) {
        BMPExporter.toDataURL(canvas, (url: string) => {
            let a = document.createElement("a");
            a.href = url;
            a.download = `Image.jpg`;
            a.click();
        })
    }
}

export default BMPExportStrategy