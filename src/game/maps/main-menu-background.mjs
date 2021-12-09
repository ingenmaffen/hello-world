import { solarSystem } from "./solar-system.mjs";

export const background = {
    ...solarSystem,
    planetArrangement: null,
    playerConfig: {
        normalMovementDisabled: true,
        yAxisDisabledOnClick: true,
        moveOnClick: false,
        canNormalMoveOnXAxis: false,
        cameraDisabled: true,
    }
}
