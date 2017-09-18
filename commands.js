
/*process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  process.stdout.write('You typed: ' + cmd);
  process.stdout.write('\nprompt > ');

});*/

//process.stdin.setEncoding('utf8');
/*
var fs=require('fs');

module.exports={

write : process.stdout.write('prompt > '),

on: process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline // this ir required to compare the lines 

  //var echo=cmd.slice(4);

/*
if(cmd=="pwd")
process.stdout.write( process.cwd());
  
if(cmd=="date")
{
    //var datetime = new Date();
    console.log(Date.now());
 // var date= process.Date();
//process.stdout.write( date);
}

if(cmd=="ls")
  {
fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
  })
 process.stdout.write("prompt > ");
});

var echo=cmd.slice(0,4);

  }



//process.stdout.write(echo);

  process.stdout.write('\nprompt > ');
  

})

};
*/

var fs = require("fs");
var request = require('request');


function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    var userInputArray = userInput.split(" ");
    var cmdList = userInput.split(/\s*\|\s*/g) ;
    //console.log("cmd=========="+typeof(cmdList));
    //var command = userInputArray[0];
   
   if(userInputArray.includes("|"))
{
     //var stdin=cmdList[0];
   //  command=userInputArray[0];
    // command=
    command="|";

}
       // command="|";
    else
        command = userInputArray[0];
    

    switch (command) {
        case "pwd":
            commandLibrary.pwd();
            break;
        case "date":
            commandLibrary.date();
            break;

        case "ls":
            commandLibrary.ls();
            break;
  
          
        case "echo":
            commandLibrary.echo(userInputArray);
            break;
          
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break

        case "head":
        commandLibrary.head(userInputArray.slice(1));
            break;
        
        case "tail":
         commandLibrary.tail(userInputArray.slice(1));
            break;
        case "curl": commandLibrary.curl(userInputArray.slice(1));
            break;
        case "|":
        commandLibrary.pipe(cmdList,cmdList[0].slice(4));
        break;


            

       
    }
}

var commandLibrary = {
    "pwd": function() {
        done(process.cwd());
    },
    "date": function() {
        //currentDate = new Date().toDateString();
        currentDate = new Date().toString();
        done(currentDate);
    },
    "ls": function() {
        fs.readdir(".", function(err, files) {
            var output = "";
            if (err) throw err;
            files.forEach(function(file) {
                output += file.toString() + "\t";
            });
            done(output);
        });
    },
   
    "echo": function(userInput) {
      
       for(var i=1;i<userInput.length;i++){

        done(userInput[i]);
       }
    },

    "cat": function(file)
    {
       var filename=file[0];
       fs.readFile(filename,function(err,data)
    {
        if(err)
            throw err;
        else
            done(data);

    })
    },
    "head": function(file)
    {
        var filename=file[0];
        fs.readFile(filename,function(err,data)
    {
        if(err)
            throw err;
        else{
            //var content=data.slice(0,5);
            var dataArr = data.toString().split("\n");
            console.log(data);
            done(dataArr.slice(0,5).join("\n"));
           // console.log(typeof(data)); // data is object;
           // done(content);
        }
    })
    

    },
"tail": function(file)
{
    var filename=file[0];
        fs.readFile(filename,function(err,data)
    {
        if(err)
            throw err;
        else{
            //var content=data.slice(0,5);
            var dataArr = data.toString().split("\n");
            done(dataArr.slice(dataArr.length-6).join("\n"));
           // console.log(typeof(data)); // data is object;
           // done(content);
        }
    })
},

"curl": function(url)
{
    var URL=url[0];

    
request(URL, function (error, response, body) {
  //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log( body); // Print the HTML for the Google homepage.
  done(body);
});
},

"pipe": function(stdin,file,done)
{
    console.log(stdin,file);
}

    


};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
