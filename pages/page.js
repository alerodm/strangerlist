import { browser } from '@wdio/globals'

export default class Page {
    navigateHome () {
        return browser.url(process.env.STRANGER_BASE_URL)
    }
}
