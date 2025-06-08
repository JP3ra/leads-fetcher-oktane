import { chromium } from 'playwright';

async function runLoopnetPlaywright(){
    try{
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.loopnet.com/search/commercial-real-estate/usa/for-sale/');
        await page.getByRole('button', { name: 'All Filters' }).click();
        await page.getByRole('listitem').filter({ hasText: 'Industrial Flex Distribution' }).getByRole('button').click();
        await page.getByRole('checkbox', { name: 'Truck Terminal' }).check();
        await page.getByRole('listitem').filter({ hasText: 'Retail Bank Day Care Facility' }).getByRole('button').click();
        await page.getByRole('checkbox', { name: 'Storefront', exact: true }).check();
        await page.getByRole('checkbox', { name: 'Storefront Retail/Office' }).check();
        await page.getByRole('checkbox', { name: 'Storefront Retail/Residential' }).check();
        await page.getByRole('listitem').filter({ hasText: 'Specialty Car Wash Marina' }).getByRole('button').click();
        await page.getByRole('checkbox', { name: 'Car Wash' }).check();
        await page.getByRole('checkbox', { name: 'Parking' }).check();
        await page.getByRole('listitem').filter({ hasText: 'Land Residential/Multifamily' }).getByRole('button').click();
        await page.getByRole('listitem').filter({ hasText: 'Land Residential/Multifamily' }).getByLabel('Industrial').check();
        await page.getByRole('textbox', { name: 'Min $' }).click();
        await page.getByRole('textbox', { name: 'Min $' }).fill('500,0000');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('D');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Denton');
        await page.getByRole('link', { name: 'Denton , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('C');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Cooke');
        await page.getByRole('link', { name: 'Cooke , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('R');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Rockwall');
        await page.getByRole('link', { name: 'Rockwall , TX' }).click();
        await page.locator('#top').press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('g');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('G');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Grayson');
        await page.getByRole('link', { name: 'Grayson , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('E');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Ellis');
        await page.getByRole('link', { name: 'Ellis , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('C');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Collin');
        await page.getByRole('link', { name: 'Collin , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('D');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Dallas');
        await page.getByRole('link', { name: 'Dallas , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Tarrant');
        await page.getByRole('link', { name: 'Tarrant , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('S');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Sherma');
        await page.getByRole('link', { name: 'Sherman , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('V');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Van ');
        await page.getByRole('link', { name: 'Van Zandt , TX' }).click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().click();
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('K');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().press('CapsLock');
        await page.locator('div:nth-child(10) > div:nth-child(3) > .ui-select-container > div > .ui-select-search').first().fill('Kaufman');
        await page.getByRole('link', { name: 'Kaufman , TX' }).click();
        await page.getByRole('button', { name: 'Search' }).click();

        await page.waitForFunction(() => window.location.href.includes('?sk='));

        const filteredUrl = await page.evaluate(() => window.location.href);
        console.log(filteredUrl);

        await context.close();
        await browser.close();
        return {
            statusCode: 200,
            body:{ filteredUrl: filteredUrl }
        }

    }catch(err){
        console.error("An error occured:", err);
        return {
            statusCode: 500,
            body: {error: "Internal Server Error"}
        }
    }

}

// const response = await runLoopnetPlaywright();
// console.log(response.body.filteredUrl);
export default runLoopnetPlaywright;