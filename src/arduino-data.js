const io = require("socket.io-client");
const socket = io("https://open-prs-api.herokuapp.com/");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let data = {
  weight: 0,
  distance: 0,
  status: "",
};

console.log("\x1b[35m%s\x1b[0m", "The CLI is running");

const chat = () => {
  rl.question("Command: ", (message) => {
    if (message === "send") {
      socket.emit("arduino-data", data);
    }

    if (message === "exit") {
      rl.close();
      return;
    }

    chat();
  });
};

chat();
