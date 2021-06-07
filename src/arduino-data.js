const io = require("socket.io-client");
const socket = io("https://open-prs-api.herokuapp.com/");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Arduino> ",
});

let data = {
  weight: 0,
  distance: 0,
  status: "",
};

console.log("\x1b[35m%s\x1b[0m", "The CLI is running");

rl.prompt();

rl.on("line", (line) => {
  switch (line.trim()) {
    case "help":
      console.log("send - to send data");
      console.log("set - to set data");
      console.log("help - to see this prompt");
      break;
    case "send":
      socket.emit("arduino-data", data);
      console.log("sent:", data);
      break;
    case "set":
      rl.question("weight: ", (weight) => {
        data["weight"] = parseInt(weight);
        rl.question("distance: ", (distance) => {
          data["distance"] = parseInt(distance);
          rl.question("status: ", (status) => {
            data["status"] = status;
            console.log("set:", data);
            rl.prompt();
          });
        });
      });

      break;
    case "exit":
      rl.close();
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0);
});
