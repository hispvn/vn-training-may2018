const { remote, ipcRenderer: ipc } = require("electron");
const mainProcess = remote.require("./main");

console.log(ipc.sendSync("synchronous-message", "ping"));

ipc.on("asynchronous-reply", (event, arg) => {
  console.log(arg);
});

ipc.send("asynchronous-message", "ping");

document.querySelector("#logMessage").addEventListener("click", () => {
  mainProcess.logMessage("ping pong");
});

document.querySelector("#openFile").addEventListener("click", () => {
  mainProcess.logMessage("ping pong");
});

document.querySelector("#saveFile").addEventListener("click", () => {
  mainProcess.logMessage("ping pong");
});
