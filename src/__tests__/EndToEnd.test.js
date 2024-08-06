import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;

    jest.setTimeout(10000); // Increase Jest timeout to 30 seconds

    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow down by 250ms,
        timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
      });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).not.toBeNull();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can change the number of events displayed', async () => {
    // Change the number of events to 10
    await page.focus('#number-of-events-input');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');

    await page.type('#number-of-events-input', '10');
    await page.keyboard.press('Enter');

    // Wait for the event list to update
    await page.waitForSelector('.event');

    // Check if the correct number of events is displayed
    const events = await page.$$('.event');
    expect(events.length).toBe(10);
  });

});