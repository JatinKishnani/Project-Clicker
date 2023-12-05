async function checkLoginModule(url, matchUrl) {

    const { chromium } = require('playwright');    
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });
  
    // Create a new page
    const page = await browser.newPage();
  
    // Navigate to a website
    await page.goto(url);
    if(page.url() == matchUrl){
        browser.close()
        return false
    }
    else {
        browser.close()
        return true
    }
}

module.exports = checkLoginModule