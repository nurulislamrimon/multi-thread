const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = 5000;
const use_thread = 4;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/blocking", async (req, res) => {
  const createWorker = () => {
    return new Promise((resolve, reject) => {
      const worker = new Worker("./thread/worker", {
        workerData: {
          use_thread,
        },
      });

      worker.on("message", (data) => resolve(data));
      worker.on("error", (error) => reject(error));
    });
  };

  const promiseArray = [];
  for (let i = 0; i < use_thread; i++) {
    promiseArray.push(createWorker());
  }
  const threadResult = await Promise.all(promiseArray);
  res.send(threadResult);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
