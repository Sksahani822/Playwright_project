import { chromium, test, expect, firefox, webkit } from '@playwright/test';
import { execPath } from 'process';

const Chrome_capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Assignment Build',
        'name': 'Playwright Assignment Test',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true
    }
}

const FireFox_capabilities = {
    'browserName': 'pw-firefox', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Assignment Build',
        'name': 'Playwright Assignment Test',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true
    }
}


test.describe('LamdaTest', () => {

    test('has title -chrome', async ({ }) => {
        test.setTimeout(120000);
        const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(Chrome_capabilities))}`);
        const context = await browser.newContext();
        const page = await context.newPage();
        // 1. Open LambdaTest’s Selenium Playground
        await page.goto('https://www.lambdatest.com/selenium-playground');

        // 2. Click “Simple Form Demo”
        await page.click('text=Simple Form Demo');

        // 3. Validate that the URL contains “simple-form-demo”
        await expect(page).toHaveURL(/.*simple-form-demo.*/);

        // 4. Create a variable for a string value
        const inputMessage = 'Welcome to LambdaTest';

        // 5. Use this variable to enter values in the “Enter Message” text box
        await page.fill('#user-message', inputMessage);

        // 6. Click “Get Checked Value”
        await page.click('#showInput');

        // 7. Validate whether the same text message is displayed under “Your Message:”
        const displayedMessage = await page.locator('#message').textContent();
        expect(displayedMessage.trim()).toBe(inputMessage);
        await page.waitForTimeout(5000)
        await page.close();
        await context.close();
        await browser.close();

    });

    test('Drag & Drop - chrome', async ({ }) => {
        test.setTimeout(120000);
        const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(Chrome_capabilities))}`);
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.lambdatest.com/selenium-playground');

        // Click on "Drag & Drop Sliders"
        await page.click('text=Drag & Drop Sliders');

        // Slider for "Default value 15"
        const slider = page.locator("input[value='15']");
        const rangeText = page.locator('#rangeSuccess');

        // Drag the slider (keyboard or mouse method)
        await slider.focus();

        // Simulate keyboard arrow right until the value becomes 95
        for (let i = 15; i < 95; i++) {
            await page.keyboard.press('ArrowRight');
        }

        // Assert the value is 95
        await expect(rangeText).toHaveText('95');

        await page.close();
        await context.close();
        await browser.close();
    });

    test('Input Form Submit - chrome', async ({ }) => {
        test.setTimeout(120000);
        const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(Chrome_capabilities))}`);
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.lambdatest.com/selenium-playground/');
        await page.getByRole('link', { name: 'Input Form Submit' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();

        const name = page.locator("input#name[required]");
        const Required = await name.evaluate(Element => Element.hasAttribute('required'));
        console.log(`The alert message 'Please fill out this field' ${Required}--------  ${Required ? 'Present' : 'Not Present'} `)
        await name.fill("xxxxxx");
        await page.locator("//input[@placeholder='Email']").fill("abcd@gmail.com");
        await page.locator("//input[@placeholder='Password']").fill("ABCcde@1234");
        await page.locator("//input[@placeholder='Company']").fill("ABC");
        await page.locator("//input[@placeholder='Website']").fill("www.xyz.com");
        await page.locator("//select[@name='country']").selectOption("United States");
        await page.locator("//input[@placeholder='City']").fill("Arizona");
        await page.locator("//input[@placeholder='Address 1']").fill("ABC");
        await page.getByPlaceholder('Address 2').fill("DEF");
        await page.locator("//input[@placeholder='State']").fill("AZ");
        await page.locator("//input[@placeholder='Zip code']").fill("666555");
        await page.getByText('Submit').click();

        await expect(page.locator("//p[@class='success-msg hidden']")).toBeVisible();
        await expect(page.locator("//p[@class='success-msg hidden']")).toHaveText('Thanks for contacting us, we will get back to you shortly.')
        await page.waitForTimeout(5000)
        await page.close();
        await context.close();
        await browser.close();

    });


    test('has title -firefox', async ({ }) => {
        test.setTimeout(120000);
        const browser = await firefox.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(FireFox_capabilities))}`);
        const context = await browser.newContext();
        const page = await context.newPage();
        // 1. Open LambdaTest’s Selenium Playground
        await page.goto('https://www.lambdatest.com/selenium-playground');

        // 2. Click “Simple Form Demo”
        await page.click('text=Simple Form Demo');

        // 3. Validate that the URL contains “simple-form-demo”
        await expect(page).toHaveURL(/.*simple-form-demo.*/);

        // 4. Create a variable for a string value
        const inputMessage = 'Welcome to LambdaTest';

        // 5. Use this variable to enter values in the “Enter Message” text box
        await page.fill('#user-message', inputMessage);

        // 6. Click “Get Checked Value”
        await page.click('#showInput');

        // 7. Validate whether the same text message is displayed under “Your Message:”
        const displayedMessage = await page.locator('#message').textContent();
        expect(displayedMessage.trim()).toBe(inputMessage);
        await page.waitForTimeout(5000)
        await page.close();
        await context.close();
        await browser.close();

    });


    test('Drag & Drop - FireFox', async ({ }) => {
        test.setTimeout(120000);
        const browser = await firefox.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(FireFox_capabilities))}`);
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.lambdatest.com/selenium-playground');

        // Click on "Drag & Drop Sliders"
        await page.click('text=Drag & Drop Sliders');

        // Slider for "Default value 15"
        const slider = page.locator("input[value='15']");
        const rangeText = page.locator('#rangeSuccess');

        // Drag the slider (keyboard or mouse method)
        await slider.focus();

        // Simulate keyboard arrow right until the value becomes 95
        for (let i = 15; i < 95; i++) {
            await page.keyboard.press('ArrowRight');
        }

        // Assert the value is 95
        await expect(rangeText).toHaveText('95');


        await page.close();
        await context.close();
        await browser.close();
    });


    test('Input Form Submit - firefox', async ({ }) => {
        test.setTimeout(120000);
        const browser = await firefox.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(FireFox_capabilities))}`);
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.lambdatest.com/selenium-playground/');
        await page.getByRole('link', { name: 'Input Form Submit' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();

        const name = page.locator("input#name[required]");
        const Required = await name.evaluate(Element => Element.hasAttribute('required'));
        console.log(`The alert message 'Please fill out this field' ${Required}--------  ${Required ? 'Present' : 'Not Present'} `)
        await name.fill("xxxxxx");
        await page.locator("//input[@placeholder='Email']").fill("abcd@gmail.com");
        await page.locator("//input[@placeholder='Password']").fill("ABCcde@1234");
        await page.locator("//input[@placeholder='Company']").fill("ABC");
        await page.locator("//input[@placeholder='Website']").fill("www.xyz.com");
        await page.locator("//select[@name='country']").selectOption("United States");
        await page.locator("//input[@placeholder='City']").fill("Arizona");
        await page.locator("//input[@placeholder='Address 1']").fill("ABC");
        await page.getByPlaceholder('Address 2').fill("DEF");
        await page.locator("//input[@placeholder='State']").fill("AZ");
        await page.locator("//input[@placeholder='Zip code']").fill("666555");
        await page.getByText('Submit').click();

        await expect(page.locator("//p[@class='success-msg hidden']")).toBeVisible();
        await expect(page.locator("//p[@class='success-msg hidden']")).toHaveText('Thanks for contacting us, we will get back to you shortly.')
        await page.waitForTimeout(5000)
        await page.close();
        await context.close();
        await browser.close();

    });


});