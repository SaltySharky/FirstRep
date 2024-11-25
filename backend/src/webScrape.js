const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://www.bodybuilding.com/exercises/finder';

    try {
        console.log("Opening page...");
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
        console.log("Page loaded!");

        // Click on "Load More" button until all exercises are loaded
        let loadMoreVisible = true;
        while (loadMoreVisible) {
            try {
                loadMoreVisible = await page.$eval('button.js-ex-loadMore', button => {
                    button.click();
                    return true;
                });
                await page.waitForTimeout(2000); // Wait for new exercises to load
                console.log("Clicked 'Load More' button...");
            } catch (error) {
                loadMoreVisible = false;
                console.log("No more 'Load More' button.");
            }
        }

        console.log("Extracting exercise details...");

        // Extract exercise details
        const exercises = await page.evaluate(() => {
            const results = [];
            const exerciseElements = document.querySelectorAll('.ExResult-row');

            exerciseElements.forEach(exercise => {
                const nameElement = exercise.querySelector('.ExResult-resultsHeading a');
                const muscleElement = exercise.querySelector('.ExResult-muscleTargeted a');
                const equipmentElement = exercise.querySelector('.ExResult-equipmentType a');

                results.push({
                    name: nameElement ? nameElement.innerText.trim() : null,
                    muscle: muscleElement ? muscleElement.innerText.trim() : null,
                    equipment: equipmentElement ? equipmentElement.innerText.trim() : null
                });
            });

            return results;
        });

        // Save extracted data to a JSON file
        fs.writeFileSync('exercises.json', JSON.stringify(exercises, null, 2));
        console.log("Exercise data saved to 'exercises.json'");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await browser.close();
    }
})();
