const tmi = require("tmi.js");
const fs = require('fs');
require('dotenv').config();
let dadJokes = [""];
let quotes = [""];
let ga = false;
const readLine = require("readline");
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Define configuration options

const opts = {
  identity: {
    username: process.env.BOT_USERNAME ,
    password: process.env.OAUTH_TOKEN
  },
  channels:[ process.env.CHANNEL_NAME
]
};

// Create a client with our options
const client = new tmi.client(opts);
fs.readFile('jokes.txt', 'utf8', function(err, data){
    dadJokes = data.split("\n");
});


// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();


// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot
  msg = msg.toLowerCase();
  //remove whitespace
  const commandName = msg.split(" ");
  let im = commandName.indexOf("i'm");
  if(im == -1){
    im = commandName.indexOf("i’m"); //weird check for ' typed from phone
  }
  let im2 = commandName.indexOf("im");
  //gets first instance of an i'm
  if(im2 < im && im2 != -1){
    im = -1;
  }
  if(im < im2 && im != -1){
    im2 = -1;
  }

  if ((im != -1 || im2 != -1) && commandName.length > 1) {
    if(im != -1 ){
      client.say(
        target,
        `Hi ` + commandName.slice(im+1).join(" ")+ ", I'm Dad"
      );
      console.log(`dad command ran!`);
    }
    if(im2 != -1){
      client.say(
        target,
        `Hi ` + commandName.slice(im2+1).join(" ") + ", I'm Dad"
      );
      console.log(`dad command ran!`);
    }

  }


  const otherJoke = commandName.slice(0,4).join(" ");
  const milk = commandName.slice(0,5).join(" ");

  // If the command is known, let's execute it
  if (commandName[0] === "!joke" || otherJoke == "tell me a joke") {
    const theJoke = getJoke(commandName);
    client.say(
      target,
      `${theJoke}`
    );
    console.log(`* Executed joke command`);
  }

  if(commandName[0] == "!dad"){
    client.say(
      target,
      `you got dadded GlitchCat `
    );
    console.log(`* Executed dadded command`);
  }
  if(milk == "where did you go dad?"){

    client.say(
      target,
      `To the store to get some chocy milk`
    );
    console.log(`* Executed milk command`);
  }



}

// Function called when the "joke" command is issued
function getJoke() {

 const j = dadJokes.length;
  return dadJokes[Math.floor(Math.random() * j)];
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
