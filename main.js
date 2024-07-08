const { app, BrowserWindow, globalShortcut, screen } = require("electron");
const path = require("path");
const { exec } = require("child_process");
const os = require("os");

const hs = os.hostname();

let user = "user";
exec("echo $(ldapsearch uid=$USER | grep cn )", (e, out, err) => {
  user = out.slice(4);
});

let mainWindow;

const createWindow = async () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    height: height,
    width: width,
    fullscreen: true,
    frame: false,
    closable: false,
    movable: false,
    backgroundColor: "#000000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    // kiosk: true,
  });

  mainWindow.loadURL("http://localhost:3000");

  globalShortcut.register("Control+Alt+.", () => {
    mainWindow.closable = true;
    mainWindow.close();
    app.quit();
  });

  // Disable default behavior of Command+Tab
  globalShortcut.register("Command+Tab", (e) => {
    console.log("Command+Tab pressed, but it is prevented.");
    e.preventDefault();
  });

  // Additional shortcut for opening dev tools
  globalShortcut.register("Control+,", () => {
    mainWindow.webContents.openDevTools();
  });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("message-from-main", [user, hs.split(".")[0]]);
    mainWindow.webContents.on("before-input-event", (event, input) => {
      if (input.type === "keyDown") {
        if ((input.control || input.meta) && input.key === "=") {
          event.preventDefault();
        } else if ((input.control || input.meta) && input.key === "-") {
          event.preventDefault();
        }

        if (input.control && input.key === ",") {
          mainWindow.webContents.openDevTools();
        }
      }
    });
  });

  mainWindow.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load URL:', errorDescription);
  });

  mainWindow.on('unresponsive', () => {
    console.error('Window is unresponsive');
  });

  mainWindow.on('crashed', () => {
    console.error('Window has crashed');
  });
};

app.whenReady().then(() => {
  if (app.dock) app.dock.hide();
  createWindow();

  const ret = globalShortcut.isRegistered('Command+Tab');
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
