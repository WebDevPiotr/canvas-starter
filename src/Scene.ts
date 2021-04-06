class Scene {

    private _layers: Map<number, HTMLImageElement> = new Map()

    public add(image: HTMLImageElement, layerIndex: number){
        this._layers.set(layerIndex, image)
    }

    public remove(layerIndex: number){
        this._layers.delete(layerIndex)
    }

    get layers(): Map<number, HTMLImageElement> { return this._layers }
}

export default Scene