/**
 * It is necessary to set status 202 in response to avoid timeout issue, 
 * so that client gets a Accepted response which will not keep the
 * client pending as request is processing
 * 
 * Reference: https://farazdagi.com/2014/rest-and-long-running-jobs/
 */
const initiateJobQueue = function () {
  const async = require("async");

  const tasks = Array.from(Array(100), (x, index) => `Task ${index + 1}`);

  const handleTask = function (task, callback) {
    setTimeout(() => {
      console.log(`Processing Task >>>>>>>>>>>>>>>>>> : ${task}`);
      if (callback) {
        callback();
      }
    }, 1000);
  };

  const asyncQueue = async.queue(function (task, callback) {
    handleTask(task, callback);
  }, 5);

  tasks.forEach((task) => {
    asyncQueue.push(task, function (err) {
      if (!err) {
        console.log(`Finised task <<<<<<<<<<<<<<<<<< : ${task}`);
      }
    });
  });

  asyncQueue.drain(function () {
    console.log("All items have been processed");
  });
};

module.exports.initiateJobQueue = initiateJobQueue;
