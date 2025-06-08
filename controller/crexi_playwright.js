import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.crexi.com/properties?pageSize=60');
  await page.getByTitle('Property Type').locator('div').nth(1).click();
  await page.locator('div:nth-child(8) > .crxe-checkbox-item > .crxe-caret-button').click();
  await page.locator('#mat-mdc-checkbox-18-input').check();
  await page.locator('div:nth-child(12) > .crxe-checkbox-item > .crxe-caret-button').click();
  await page.locator('#mat-mdc-checkbox-31-input').check();
  await page.locator('#mat-mdc-checkbox-11-input').check();
  await page.locator('div:nth-child(3) > .crxe-checkbox-item > .crxe-caret-button').click();
  await page.locator('#mat-mdc-checkbox-35-input').check();
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.locator('crx-price-range-dropdown div').nth(1).click();
  await page.locator('input[name="minValue"]').click();
  await page.locator('input[name="minValue"]').fill('500,0000');
  await page.getByRole('button', { name: 'Apply' }).click();

  console.log("URL", page.url());

  // Wait for any network activity to finish before capturing HTML
  await page.waitForLoadState('networkidle');

  const html = await page.content();

  // Write the HTML to a file named 'finalPage.html' in the current directory
  fs.writeFileSync('finalPage.html', html);

  console.log('HTML content saved to finalPage.html');

  // ---------------------
  await context.close();
  await browser.close();
})();
