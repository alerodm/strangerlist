import axios from 'axios'
import path from 'path'
import urlJoin from 'url-join';
import { fileURLToPath } from 'url';

import { expect } from '@wdio/globals'
import HomePage from '../../pages/home.page.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const getItemsFromAPI = async () => {
    const getItemsUrl = urlJoin(process.env.STRANGER_BASE_URL, '/api/items')
    const response = await axios.get(getItemsUrl)
    expect(response.status).toEqual(200)
    return response.data
}

const findNewItems = (items1, items2) => {
    const diff = items2.filter(obj2 => !items1.some(obj1 => obj2.id === obj1.id))
    return diff
}

const createItem = async () => {
    const imgFileName = '320x320.png'
    const imgFullPath = path.join(__dirname, imgFileName)
    const timestamp = Date.now();
    const text = `Item created by an e2e test - ${timestamp}`
    await HomePage.createItem(imgFullPath, text)
    return { text, imgFileName }
}


describe('Angular Stranger List - Home', () => {
    const itemCleanupList = []

    it('001 - item creation is succesful', async () => {
        const itemsFromAPI = await getItemsFromAPI() // used later for cleanup purposes

        await HomePage.navigateHome()
        const newItem = await createItem()
        expect(await HomePage.ItemsList.isItemPresent(newItem.imgFileName, newItem.text)).toBeTruthy()

        // I could not find a way to obtain the id of the created item from the DOM, so to do
        // a proper cleanup I restorted to obtaining the id by diffing the get items request response
        const itemsFromApiAfterCreation = await getItemsFromAPI()
        const newItems = findNewItems(itemsFromAPI, itemsFromApiAfterCreation)
        if (newItems.length > 0) {
            itemCleanupList.push(newItems[0].id)
        }
    })

    it('002 - editing all fields from an existing item is succesful', async () => {
        const itemsFromAPI = await getItemsFromAPI() // used later for cleanup purposes

        await HomePage.navigateHome()
        const testItem = await createItem()
        const newText = `${testItem.text} - modified`
        const imgFileName = '320x320sq.png'
        const imgFullPath = path.join(__dirname, imgFileName)
        await HomePage.editItem(testItem.text, imgFullPath, newText)
        expect(await HomePage.ItemsList.isItemPresent(imgFileName, newText)).toBeTruthy()

        // cleanup
        const itemsFromApiAfterCreation = await getItemsFromAPI()
        const newItems = findNewItems(itemsFromAPI, itemsFromApiAfterCreation)
        if (newItems.length > 0) {
            itemCleanupList.push(newItems[0].id)
        }
    })

    it('003 - deleting an existing item is succesful', async () => {
        await HomePage.navigateHome()
        const testItem = await createItem()
        await HomePage.deleteItem(testItem.text)
        expect(await HomePage.ItemsList.isItemPresent(testItem.imgFileName, testItem.text)).toBeFalsy()
    })

    it('004 - max length should be enforced in the text field of the Item Details form', async () => {
        await HomePage.navigateHome()

        HomePage.formImageField.setValue('foo.jpg')  // file input has to be completed to enable the button 

        const chars301 = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
            'Aenean commodo ligula eget dolor. Aenean massa.',
            'Cum sociis natoque penatibus et magnis dis parturient montes,',
            'nascetur ridiculus mus. Donec quam felis, ultricies nec,',
            'pellentesque eu, pretium quis, sem.',
            'Nulla consequat massa quis enim. Donec p',].join('\n')
        await HomePage.formTextField.setValue(chars301)
        await expect(HomePage.createItemButton).toBeDisabled()

        // now we send 300 chars and verify the form is succesfully validated
        await HomePage.formTextField.setValue(chars301.slice(0, -1))
        await expect(HomePage.createItemButton).toBeEnabled()
    })

    it('005 - verify specific string is contained as part of an item\'s text', async () => {
        await HomePage.navigateHome()
        const targetText = 'Creators: Matt Duffer, Ross Duffer'
        await expect($(`p.=${targetText}`)).toBeDisplayed()
    })

    after(async () => {
        for (const itemId of itemCleanupList) {
            const deleteUrl = urlJoin(process.env.STRANGER_BASE_URL, `/api/items/${itemId}`)
            const response = await axios.delete(deleteUrl)
            expect(response.status).toEqual(200)
        }
    })
})

