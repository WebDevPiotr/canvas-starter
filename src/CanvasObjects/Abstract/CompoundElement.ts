import Element from './Element'
import RenderableElement from './RenderableElement'

interface ICompound {
    add(...elements: RenderableElement[]): void
    remove(element: RenderableElement): void
}
abstract class CompoundElement extends Element implements ICompound {

    private _elements: RenderableElement[] = []

    get elements() { return this._elements }

    add(...elements: RenderableElement[]) {
        this._elements.push(...elements)
    }

    remove(element: RenderableElement) {
        this._elements = this._elements.filter(x => x.id === element.id)
    }
}

export default CompoundElement