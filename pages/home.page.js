import ItemsList from './itemslist.page.js'
import Page from './page.js'

import { $ } from '@wdio/globals'


class HomePage extends Page {
    constructor() {
        super()
        this.ItemsList = ItemsList;
    }
    
    get listTitle() {
        return $('h1.*=list of items')
    }

    get formTextField() {
        return $('textarea[name="text"]')
    }

    get formImageField() {
        return $('input[name="imageSrc"]')
    }

    get createItemButton() {
        return $('button.=Create Item')
    }

    get updateItemButton() {
        return $('button.=Update Item')
    }

    get deleteConfirmationButton() {
        return $('button.=Yes, Delete it!')
    }

    async getItemCount() {
        const titleText = await this.listTitle.getText()
        const countMatch = titleText.match(/\((\d+)\)/)
        if (countMatch) {
            const count = parseInt(countMatch[1])
            return count
          } else {
            return null
          }
    }

    async createItem(filePath, text) {
        await this.formImageField.setValue(filePath)
        await this.formTextField.setValue(text)
        await this.createItemButton.click()
    }

    async editItem(textToMatch, filePath, text) {
        // textToMatch is used to identify which item to edit, since we cannot do it easily by id
        const targetEditButton = await $(`//p[contains(text(), "${textToMatch}")]/ancestor::li//button[contains(text(), 'Edit')]`)
        await targetEditButton.click()

        if (filePath !== null) {
            await this.formImageField.setValue(filePath)
        }
        if (text !== null) {
            await this.formTextField.setValue(text)
        }
        await this.updateItemButton.click()
    }

    async deleteItem(textToMatch) {
        // textToMatch is used to identify which item to delete, since we cannot do it easily by id
        const targetDeleteButton = await $(`//p[contains(text(), "${textToMatch}")]/ancestor::li//button[contains(text(), 'Delete')]`)
        await targetDeleteButton.click()
        await this.deleteConfirmationButton.click()
    }

    async doesItemExist(text) {
        await $(`//p[contains(text(), "${text}")]/ancestor::li//button[contains(text(), 'Edit')]`)
    }
}

export default new HomePage();
