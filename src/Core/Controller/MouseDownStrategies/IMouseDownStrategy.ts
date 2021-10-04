import SceneController from "Core/Controller/Controller";
import { Intersection } from "Core/types";

interface IMouseDownStrategy {
    execute(controller: SceneController, intersection?: Intersection): void
}

export default IMouseDownStrategy