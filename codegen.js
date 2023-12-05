

async function codeGen() {
    const browser = await chromium.launchPersistentContext("./UserDataDir", {
        headless: false,
      });
    
      const page = await browser.newPage();
    
      page.pause();}


module.exports = codeGen