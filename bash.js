//console.log(Object.keys(process));

//process.stdout.write('prompt > ');

/*process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  process.stdout.write('You typed: ' + cmd);
  process.stdout.write('\nprompt > ');

});*/

//process.stdin.setEncoding('utf8');

/*
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline // this ir required to compare the lines 
  
if(cmd=="pwd")
process.stdout.write( process.cwd());
  
if(cmd=="date")
{
    //var datetime = new Date();
    console.log(Date.now());
 // var date= process.Date();
//process.stdout.write( date);
}
//console.log(datetime);
  process.stdout.write('\nprompt > ');
  

});

*/
//console.log(`Current directory: ${process.cwd()}`);


//var commands= require('./commands.js')
//process.stdout.write('prompt > ');
//commands.write;
//commands.on;

var commands = require("./commands.js");

process.stdout.write('prompt > ');
process.stdin.on('data', function(userInput) {
  userInput = userInput.toString().trim();
  commands.evaluateCmd(userInput);
});