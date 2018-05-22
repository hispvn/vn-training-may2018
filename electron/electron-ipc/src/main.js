const { app, ipcMain: ipc, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const url = require("url");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
    require("devtron").install();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

// IPC
ipc.on("asynchronous-message", (event, arg) => {
  console.log(arg);
  event.sender.send("asynchronous-reply", "pong");
});

ipc.on("synchronous-message", (event, arg) => {
  console.log(arg);
  event.returnValue = "pong";
});

const logMessage = msg => {
  console.log(`LOG: ${msg}`);
};

module.exports = { logMessage };
