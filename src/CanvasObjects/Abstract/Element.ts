import { v4 as uuidv4 } from 'uuid';
import CanvasElementTypes from '../types'
import CanvasElementsTypes from '../types';

abstract class Element {

    readonly id: string
    readonly type: CanvasElementTypes | CanvasElementsTypes

    constructor(type: CanvasElementTypes | CanvasElementsTypes) {
        this.id = uuidv4()
        this.type = type
    }

}

export default Element