const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

const createWindow = () => {
  let loader = new BrowserWindow({ width: 200, height: 200, show: false, frame: false });

  loader.once("show", () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600, show: false });

    setTimeout(() => {
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true
        })
      );

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
    url.format({
      pathname: path.join(__dirname, "loader.html"),
      protocol: "file:",
      slashes: true
    })
  );

  loader.webContents.once("dom-ready", () => {
    loader.show();
  });
};

app.on("ready", createWindow);
