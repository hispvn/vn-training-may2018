const { app, ipcMain: ipc, dialog, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const url = require("url");
const ljf = require("load-json-file");

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

app.on("ready", () => {
  createWindow();

  mainWindow.webContents.on("dom-ready", () => {
    setInterval(() => {
      mainWindow.send("update-counter", Math.round(Math.random() * 1000));
    }, 1000);
  });
});

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
  return Math.round(Math.random() * 1000);
};

const openFile = () => {
  return new Promise((res, rej) => {
    dialog.showOpenDialog(
      mainWindow,
      {
        title: "Open files man",
        filters: ["json"]
      },
      files => {
        if (files.length === 0) return;
        const file = files[0];

        const content = ljf.sync(file);
        res(content);
      }
    );
  });
};

module.exports = { logMessage, openFile };
