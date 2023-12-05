

async function codeGen() {
    const { chromium } = require('playwright');    
    const browser = await chromium.launchPersistentContext("./UserDataDir", {
        headless: false,
      });
    
      const page = await browser.newPage();
    
      page.pause();}


module.exports = codeGen