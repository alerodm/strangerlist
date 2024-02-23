import FormPage from './form.page.js'
import ItemsListPage from './itemslist.page.js'
import Page from './page.js'


class HomePage extends Page {
    constructor() {
        super()
        this.itemsList = ItemsListPage;
        this.form = FormPage;
    }
}

export default new HomePage();
