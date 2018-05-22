const { remote, ipcRenderer: ipc } = require("electron");
const mainProcess = remote.require("./main");

ipc.on("asynchronous-reply", (event, arg) => {
  console.log(arg);
});

document.querySelector("#syncMessage").addEventListener("click", () => {
  console.log(ipc.sendSync("synchronous-message", "ping"));
});

document.querySelector("#asyncMessage").addEventListener("click", () => {
  ipc.send("asynchronous-message", "ping");
});

document.querySelector("#logMessage").addEventListener("click", async () => {
  const res = await mainProcess.logMessage("ping pong");
  console.log(res);
});

document.querySelector("#openFile").addEventListener("click", () => {
  mainProcess.openFile().then(content => {
    console.log(content);
  });
});

document.querySelector("#saveFile").addEventListener("click", () => {
  mainProcess.logMessage("ping pong");
});
