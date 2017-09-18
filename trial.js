var startTime = new Date;

console.log("hi");
setTimeout(function () {
  var endTime = new Date;
  console.log('Time elapsed: ', endTime - startTime, 'ms');
}, 500);

console.log("Bye");
while (new Date - startTime < 1000) {console.log("time")};
console.log("hello");