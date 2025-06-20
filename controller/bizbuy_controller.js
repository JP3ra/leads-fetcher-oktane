import { chromium } from 'playwright';

export async function runBizBuySellPlaywright() {
  try{
const browser = await chromium.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-http2'
  ]
});
      const page = await browser.newPage();

      await page.goto('https://www.bizbuysell.com/texas/dallas-fort-worth-metroplex-businesses-for-sale/');

      await page.getByRole('button', { name: 'Price Range' }).click();
      await page.getByText('$3,000,000').nth(1).click();
      await page.getByRole('button', { name: 'Apply' }).click();

      await page.getByRole('button', { name: /More Filters/i }).click();

      await page.locator('#mobile-more-filter app-bfs-mobile-generic-range-modal')
        .filter({ hasText: 'Cash FlowMin$50,000$100,000$' })
        .getByRole('combobox')
        .first()
        .selectOption('3: 150000');

      await page.locator('div')
        .filter({ hasText: /^Must have real estate included$/ })
        .locator('div')
        .click();

      await page.getByRole('button', { name: 'Apply' }).click();
      await page.waitForFunction(() => {
        const q = new URLSearchParams(window.location.search).get("q");
        return q && atob(q).includes("150000") && atob(q).includes("3000000");
      }, { timeout: 10000 });

      const finalUrl = await page.evaluate(() => window.location.href);
      console.log('Filtered URL:', finalUrl);


      await browser.close();

      return {
          statusCode: 200,
          body:{ filteredUrl: finalUrl }
      }


  }catch(err){
      console.error("An error occured:", err);
      return {
          statusCode: 500,
          body: {error: "Internal Server Error"}
      }
  }

}

