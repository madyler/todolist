describe('appWithRedux', () => {
    it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?path=/story/appwithredux-component--app-with-redux-base-example');
        const image = await page.screenshot();

        // API from jest-snapshot
        expect(image).toMatchImageSnapshot()
    })
})