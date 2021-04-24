import Vector from "Utils/Vector2";
import SceneController from "../Controller";

interface IMouseMoveStrategy {
    execute(mousePosition: Vector, controller: SceneController): void
}

export default IMouseMoveStrategy