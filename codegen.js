

async function main() {
    const { chromium } = require('playwright');    
const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });

const page = await browser.newPage();

page.pause();}

main()


module.exports = main