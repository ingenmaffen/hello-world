const fs = require('fs');

// copy three.module.js
fs.copyFile('./node_modules/three/build/three.module.js', './node_modules/three/build/three.module.mjs', (err) => {
  if (err) throw err;
});

// copy tween.esm.js
fs.copyFile('./node_modules/@tweenjs/tween.js/dist/tween.esm.js', './node_modules/@tweenjs/tween.js/dist/tween.esm.mjs', (err) => {
  if (err) throw err;
});