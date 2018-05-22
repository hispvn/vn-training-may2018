const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;

const createWindow = () => {
  let loader = new BrowserWindow({ width: 200, height: 200, show: false, frame: false });

  loader.once("show", () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600, show: false });

    setTimeout(() => {
      mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

      mainWindow.on("closed", () => {
        mainWindow = null;
      });
    }, 3000);

    mainWindow.webContents.once("dom-ready", () => {
      mainWindow.show();
      loader.hide();
      loader.close();
      loader = null;
    });
  });

  loader.loadURL(
    isDev ? "http://localhost:3000/loader.html" : `file://${path.join(__dirname, "../build/loader.html")}`
  );

  loader.webContents.once("dom-ready", () => {
    loader.show();
  });
};

app.on("ready", createWindow);
