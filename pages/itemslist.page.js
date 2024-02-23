import Page from './page.js'

export default class ItemsList extends Page {
    async getItems() {
        const items = await $$('ul[ng-model="items"] > li')
        const itemDetails = []
        for (const item of items) {
            const text = await (await item.$('p')).getText()
            const imgSrc = await item.$('img').getAttribute('src')
            itemDetails.push({ text, imgSrc })
        }
    
        return itemDetails;
      }
}
