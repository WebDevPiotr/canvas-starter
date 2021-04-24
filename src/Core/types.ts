import Vector from 'Utils/Vector2'
import MoveableElement from 'CanvasObjects/Abstract/MoveableElement'
import RenderableElement from 'CanvasObjects/Abstract/RenderableElement'

export type Size = {
    width: number,
    height: number
}

export type Intersection = {
    element: RenderableElement | MoveableElement | null,
    position: Vector
}

export enum ExportTypes {
    PDF = 'PDF',
    JPG = 'JPG',
    PNG = 'PNG',
    BMP = 'BMP'
}

export type ElementSource = File | string