import { playMenuMusic } from "../sounds/music.mjs";
import { solarSystem } from "./solar-system.mjs";

export const background = {
    ...solarSystem,
    music: playMenuMusic,
    planetArrangement: null,
    playerConfig: {
        normalMovementDisabled: true,
        yAxisDisabledOnClick: true,
        moveOnClick: false,
        canNormalMoveOnXAxis: false,
        cameraDisabled: true,
    }
}
