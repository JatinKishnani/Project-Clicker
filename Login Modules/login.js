async function login(url) {
    const { chromium } = require('playwright');    
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });  
    // Create a new page
    const page = await browser.newPage();
  
    // Navigate to a website
    await page.goto(url)
    await page.waitForURL(url,{timeout: 300000})
    await browser.close()
}


module.exports = login