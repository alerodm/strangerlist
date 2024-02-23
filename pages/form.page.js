import Page from './page.js'

class FormPage extends Page {
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
}

export default new FormPage();
