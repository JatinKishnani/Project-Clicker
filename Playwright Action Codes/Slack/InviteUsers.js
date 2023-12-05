async function InviteUsers(users) {

    const { chromium } = require('playwright');    
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });

    users.forEach(async user => {
        const page = await browser.newPage();
        await page.goto("https://zluri-dev.slack.com/admin"); 
        await page.getByRole('button', { name: 'Invite People' }).click();
        await page.locator('.c-multi_select_input').click();
        await page.getByLabel('Emails to invite').fill(` ${user} `);
        await page.getByLabel('Emails to invite').press('Enter');
        await page.getByRole('button', { name: 'Send' }).click();
        await page.getByRole('button', { name: 'Done' }).click();
        await page.close()
    });

    await browser.close();
}

module.exports = InviteUsers