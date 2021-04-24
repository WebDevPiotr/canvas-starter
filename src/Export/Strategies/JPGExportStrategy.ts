import IExportStrategy from "Export/IExportStrategy";

class JPGExportStrategy implements IExportStrategy {

    public execute(canvas: HTMLCanvasElement) {
        let url = canvas.toDataURL('image/jpeg')
        let a = document.createElement("a");
        a.href = url;
        a.download = `Image.jpg`;
        a.click();
    }
}

export default JPGExportStrategy