var express = require("express");
const queue = require("../queue/async-queue");

var router = express.Router();

/* GET tasks router response. */
router.get("/", function(req, res, next) {
  res.send("Task router is in.");
});

router.post("/execute/queue", function(req, res, next) {
  queue.initiateJobQueue();
  // It is necessary handle long running http requests to set status 202
  // It will immediately send the response to the client,
  // but it will handle the process parallelly.
  // Reference: https://farazdagi.com/2014/rest-and-long-running-jobs/
  res.status(202);
  res.send("Long running tasks executing, be patient.");
});

module.exports = router;
