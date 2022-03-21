describe('Task', () => {
    it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?path=/story/task-component--task-base-example');
        const image = await page.screenshot();

        // API from jest-snapshot
        expect(image).toMatchImageSnapshot()
    })
})