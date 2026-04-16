import {test, expect} from '@playwright/test';

test.describe('Home Page with no auth', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('Visual Test', async ({page}) => {
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('home-page-no-auth.png', {
            mask: [page.getByTitle('Practice Software Testing - Toolshop')]
        });
    });

    test('Check Sign in', async ({page}) => {
        await expect(page.getByTestId('nav-sign-in')).toHaveText('Sign in');
    });

    test('Validate page title', async ({page}) => {
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    });


    test('Grid loads with 9 items', async ({page}) => {    
        let productGrid = page.locator(".col-md-9");
        await expect(productGrid.getByRole("link")).toHaveCount(9);
    });


    test('Search for Thor Hammer', async ({page}) => {
        await page.getByTestId('search-query').fill('Thor Hammer');
        await page.getByTestId('search-submit').click();
        await expect(page.getByAltText("Thor Hammer")).toBeVisible();
    });
});

test.describe('Home Page customer 01 auth', () => {
    test.use({ storageState: '.auth/customer01.json' });
    test.beforeEach(async ({page}) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('Visual Test Authorized', async ({page}) => {
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('home-page-customer01.png', {
            mask: [page.getByTitle('Practice Software Testing - Toolshop')]
        });
    });

    test('Check Sign in', async ({page}) => {
        await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
        await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
    });
});
