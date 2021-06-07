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

const chat = () => {
  rl.question("Command: ", (message) => {
    if (message === "set") {
      rl.question("Weight:", (weight) => (data["weight"] = parseInt(weight)));
      rl.pause();
      rl.question(
        "Distance:",
        (distance) => (data["distance"] = parseInt(distance))
      );
      rl.pause();
      rl.question("Status:", (status) => (data["status"] = status));
      rl.pause();
    }
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
