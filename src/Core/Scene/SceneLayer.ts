class SceneLayer<T> {

    constructor(private _index: number, private _element: T) { }

    set index(index: number) { if (index >= 0) this._index = index }
    get index() { return this._index }
    get element() { return this._element }
}

export default SceneLayer