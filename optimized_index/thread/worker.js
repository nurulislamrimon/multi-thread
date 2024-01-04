const { parentPort, workerData } = require("worker_threads");

const { parentPort } = require("worker_threads");

const start = new Date().toLocaleString();

for (let i = 0; i < 10000000000 / workerData.use_thread; i++) {}
const end = new Date().toLocaleString();
// time calculated
const differ = new Date(end) - new Date(start);

// worker thread event emited
parentPort.postMessage({ start, end, differ });
