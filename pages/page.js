import { browser } from '@wdio/globals'

export default class Page {
    async navigateHome() {
        await browser.url(process.env.STRANGER_BASE_URL)
        await browser.waitUntil(() => {
            return $('ul[ng-model="items"]').isDisplayed()
          }, {
            timeout: 5000,
            timeoutMsg: 'Could not find items list ul element after 5 seconds'
          })
    }
}
