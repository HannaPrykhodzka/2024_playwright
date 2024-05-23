export class InsightsEpamPage {

    constructor(page) {
        this.searchField = page.locator('div.search');
        this.searchInput = page.locator('input.search__input');
        this.findButton = page.locator('.search__submit-text');
        this.searchResults = page.locator('article.search-results__item .search-results__title-link');
        }

    async search(query) {
        await this.searchField.click();
        await this.searchInput.fill(query);
        await this.findButton.click();
    }
}
