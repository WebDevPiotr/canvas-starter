import SceneController from "../Controller";

interface IMouseUpStrategy {
    execute(controller: SceneController): void
}

export default IMouseUpStrategy