import SceneController from "Core/Controller/Controller";
import { Intersection } from "Core/types";

interface IMouseDownStrategy {
    execute(intersection: Intersection, controller: SceneController): void
}

export default IMouseDownStrategy