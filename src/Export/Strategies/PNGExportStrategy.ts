import IExportStrategy from "Export/IExportStrategy";

class JPGExportStrategy implements IExportStrategy {

    public execute(canvas: HTMLCanvasElement) {
        let url = canvas.toDataURL('image/png')
        let a = document.createElement("a");
        a.href = url;
        a.download = `Image.png`;
        a.click();
    }
}

export default JPGExportStrategy