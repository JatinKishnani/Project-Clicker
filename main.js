const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const {chromium, firefox} = require('playwright')
let {ipcMain} = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Disable nodeIntegration
      contextIsolation: false, // Enable context isolation
    },
    preload: path.join(__dirname, 'preload.js'),
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}


app.whenReady().then(() => {
  createWindow();
  //checkLogin()
  dothis()
});

async function dothis() {
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });

    const page = await browser.newPage();

page.pause();
}
async function checkLogin() {
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });
  
    // Create a new page
    const page = await browser.newPage();
  
    // Navigate to a website
    await page.goto("https://zluri-dev.slack.com/admin");
    if(page.url() == "https://zluri-dev.slack.com/?redir=%2Fadmin"){
        mainWindow.webContents.send("msg", false)
    }
    else {
        mainWindow.webContents.send("msg", true)
    }

    await browser.close()
}

async function login() {
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });
  
    // Create a new page
    const page = await browser.newPage();
  
    // Navigate to a website
    await page.goto("https://zluri-dev.slack.com/admin");

}

ipcMain.on('login',async function(event, data){
    login()
})



function loadDynamicModule() {
  // Load a module dynamically
  const dynamicModule = require('./x.js');

  console.log(dynamicModule.toString())
  // Use the module as needed
  dynamicModule();
}
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on('invokeAction',async function(event, data){

    console.log(data)
    // Launch a browser
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });


});



// await page2.getByRole('button', { name: 'Invite People' }).click();
// await page2.locator('.c-multi_select_input').click();
// await page2.getByLabel('Emails to invite').fill(' \nb@gmail.com\n \nc@gmail.com\n \nd@gmail.com\n ');
