const fs = require('fs');

// delete coverage
fs.rmSync("./coverage", { recursive: true, force: true });

// delete dist
fs.rmSync("./dist", { recursive: true, force: true });

// delete node_modules
fs.rmSync("./node_modules", { recursive: true, force: true });