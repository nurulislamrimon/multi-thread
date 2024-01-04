const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/blocking", (req, res) => {
  const worker = new Worker("./thread/custom.js");
  //   worker thread message event listened
  worker.on("message", (data) => {
    console.log(data);
    res.send("Hello World!");
  });
  //   worker thread error event listened
  worker.on("error", (err) => {
    console.log(err);
    res.send(err);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
