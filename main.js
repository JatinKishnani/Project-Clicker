const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const { chromium, firefox } = require("playwright");
let { ipcMain } = require("electron");
const login = require("./Login Modules/login");
const checkLoginModule = require("./Login Modules/checkLogin");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Disable nodeIntegration
      contextIsolation: false, // Enable context isolation
    },
    preload: path.join(__dirname, "preload.js"),
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  checkLogin();
  //CodeGen()
});



app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});


//----------------------App Boiler Plate ends here-------------------------//


//Dev testing
async function CodeGen() {
  const codeGen = require('./codegen');
  codeGen()
}


//Startup Login Module
async function checkLogin() {
  const result = await checkLoginModule(
    "https://zluri-dev.slack.com/admin",
    "https://zluri-dev.slack.com/?redir=%2Fadmin"
  );
  mainWindow.webContents.send("msg", result);
}



//IPC Reciver Events

  //User manual login
ipcMain.on("login", async function (event, data) {
  login("https://zluri-dev.slack.com/admin");
});



  //Action Execution
ipcMain.on("invokeAction", async function (event, data) {
  console.log(data);

  const users = data.users;
  const Actions = data.Actions;

  Actions.forEach(async action => {
    const ActionModule = require(`./Playwright Action Codes/Slack/${action}`)
    await ActionModule(users)
  });
  
});


//IPC Sender Events
