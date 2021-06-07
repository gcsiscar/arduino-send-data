const io = require("socket.io-client");
const socket = io("https://open-prs-api.herokuapp.com/");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat = () => {
  rl.question("Command: ", (message) => {
    if (message === "send") {
      socket.emit("arduino-data", {
        weight: 24,
        distance: 52,
        status: "not full",
      });
    }

    if (messaeg === "exit") {
      rl.close();
      return;
    }

    chat();
  });
};

chat();
