class Scene {

    private _background: HTMLImageElement
    private _layers: Map<number, HTMLImageElement> = new Map()

    public setBackground(image: HTMLImageElement){
        this._background = image
    }

    public add(image: HTMLImageElement, layerIndex: number){
        this._layers.set(layerIndex, image)
    }

    public remove(layerIndex: number){
        this._layers.delete(layerIndex)
    }

    get background(): HTMLImageElement { return this._background }
    get layers(): Map<number, HTMLImageElement> { return this._layers }
}

export default Scene