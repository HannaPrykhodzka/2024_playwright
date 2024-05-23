import { test as base, expect } from '@playwright/test';
import { MainEpamPage } from '../pom/main.page.js';
import { InsightsEpamPage } from '../pom/insights.page.js';

const test = base.extend({
  mainPage: async ({ page }, use) => {
    await page.goto('https://www.epam.com');
    await use(page);
  },
  contactPage: async ({ page }, use) => {
    await page.goto('https://www.epam.com/about/who-we-are/contact');
    await use(page);
  },
  insightsPage: async ({ page }, use) => {
    await page.goto('https://www.epam.com/insights');
    await use(page);
  },
  mainEpamPage: async ({ page }, use) => {
    await use(new MainEpamPage(page));
  },
  insightsEpamPage: async ({ page }, use) => {
    await use(new InsightsEpamPage(page));
  },
});

test.describe.configure({ mode: 'parallel' });
test.describe('EPAM Test Suite', () => {

  test.use({storageState: 'state.json'});

  test('Verify page title', async ({ mainPage }) => {
    await expect(mainPage).toHaveTitle('EPAM | Software Engineering & Product Development Services  ')
  });

  test('Main page should have hamburger menu', async ({ mainPage }) => {
    await mainPage.locator('button.hamburger-menu__button').click();
    await expect(mainPage.locator('div .hamburger-menu__dropdown')).toBeVisible();
  });

  test('Contact page should have hamburger menu', async ({ contactPage }) => {
    await contactPage.locator('button.hamburger-menu__button').click();
    await expect(contactPage.locator('div .hamburger-menu__dropdown')).toBeVisible();
  });

  test('Services menu opens on hover on top menu item', async ({ page }) => {
    await page.goto('https://www.epam.com')
    await page.locator('.top-navigation__item-text [href="/services"]').hover();
    await expect(page.locator('.top-navigation__flyout div[gradient-text="Services"]')).toBeVisible();
    });

  test('User can search', async ({ page, mainEpamPage }) => {
    await page.goto('https://www.epam.com');
    await mainEpamPage.search('Artificial Intelligence');
    await expect(mainEpamPage.searchResults.getByRole('link', { name: 'How Artificial Intelligence' })).toContainText('Artificial Intelligence', { ignoreCase: true });
  });

  test('Search for the insight', async ({ insightsPage, insightsEpamPage }) => {
    await insightsPage;
    await insightsEpamPage.search('Blockchain');
    await expect(insightsEpamPage.searchResults).toHaveCount(10);
    });
})
