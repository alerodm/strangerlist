import Page from './page.js'

class ItemsListPage extends Page {
    async isItemPresent(imgSrc, text) {
        await $('figure').waitForDisplayed() // couldn't find a better condition to make sure the list is fully loaded
        const itemList = await $$('div.media-left')
        for (const item of itemList) {
            const itemText = await item.$('p').getText()
            const itemImgSrc = await item.$('figure').$('img').getAttribute('src')
            if (itemText.includes(text) && itemImgSrc.includes(imgSrc)) {
                return true
            }
        }
        return false
    }
}

export default new ItemsListPage();
