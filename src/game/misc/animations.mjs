import { Tween } from "../../../node_modules/@tweenjs/tween.js/dist/tween.esm.mjs";

export function animate(preAnimationCallback, fromVector3, toVector3, animationDuration, onUpdateCallback, onCompleteCallback) {
    preAnimationCallback();
    new Tween(fromVector3)
        .to(toVector3, animationDuration)
        .onUpdate(onUpdateCallback)
        .onComplete(onCompleteCallback)
        .start();
}