async function RevokeUsers(users) {

    const { chromium } = require('playwright');    
    const browser = await chromium.launchPersistentContext("./UserDataDir",{ headless: false });

    users.forEach(async user => {
        const page = await browser.newPage();
        await page.goto("https://zluri-dev.slack.com/admin"); 
        await page.getByPlaceholder('Filter by name or email…').click();
        await page.getByPlaceholder('Filter by name or email…').fill(user);
        await page.locator('#workspace_members_table__row_1__column_1 > div > div > button').click()
        await page.getByRole('menuitem', { name: 'Revoke invitation' }).click();
        await page.getByRole('button', { name: 'Deactivate' }).click();

        await page.close()
    });

    await browser.close();
}

module.exports = RevokeUsers