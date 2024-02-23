# Test Cases

*001 - Create an item*

* Browse to the home page
* Locate the list of items
* Locate the `Item Details` form at the top right of the home
* For the `image` field select a 320x320 jpg or png image
* For the `text` field type any description
* Verify `Create Item` button is enabled
* Click on the `Create Item` button
* Verify a new entry was added to the end of the items list
* Verify new entry contains the uploaded image
* Verify new entry contains the exact text that was typed on the form earlier

----

*002 - Edit all fields on an existing item*

* Browse to the home page
* Locate the list of items
* Choose an item to edit, and click on the `Edit` button within the same row
* For the `image` field select a new 320x320 jpg or png image
* For the `text` field type a new description
* Verify `Update Item` button is enabled
* Click on the `Update Item` button
* Review the item that you chose to edit - The rendered image should be the one you uploaded
* Review the item that you chose to edit - The text next to the image should be the one you typed earlier
* Verify `Edit` and `Delete` buttons are available and enabled
* Verify `Item Details` returns to the new item form, i.e. `Create Item` button is rendered instead of the `Update Item` one

----

*003 - Delete an existing item*

* Browse to the home page
* Choose an item to delete, and click on the `Delete` button within the same row
* Verify a confirmation popup appears
* Confirmation text should read `Are you sure you want to delete this item?`, and you should have two buttons to either confirm (`Yes, delete it!`) or cancel (`Cancel`).
* Click on the delete button.
* Verify the choosen element was removed from the list of items

----

*004 - Max length is enforced in the text field of the Item Details form*

* Browse to the home page
* Locate the `Item Details` form at the top right of the home
* For the `image` field select a 320x320 jpg or png image
* For the `text` field type a text of 301 chars. There are various online generators like [this](https://www.blindtextgenerator.com/lorem-ipsum) one which you can use for simplicity.
* Verify the `Update Item` button is disabled.
* Delete one char from the `text` field value.
* Verify the `Update Item` button is now enabled.

----

*005 - Verify "Creators: Matt Duffer, Ross Duffer" string exists as part of one of the items text*

* Browse to the home page
* Do a control+F (or command+f if in Mac) and search for "Creators: Matt Duffer, Ross Duffer" text
* Verify there is a match as part of the text of one of the existing items

----

*006 - Uploaded images are deleted from disk*

Pre-requirement: Access to the host where the server is running, or some means to read the content of the `/public/assets/images` directory.

* Create a new item - Test case 001 can be followed for this
* List the files of the `/public/assets/images` and find the file for the image you have just uploaded
* Delete the item - Test case 003 can be followed for this 
* List the files again, and verify the file for the image was deleted

----

*007 - Upload a file with a filename that already exists*

* Pick any of the existing items, or create a new one - If needed refer to Test case 001
* Right click on the image associated with the item, and click on `Inspect`. Note: If using a browser other than Chrome or Firefox the steps to access the page code might be different.
* Find the src attribute of the `img` tag for the image, and take note of the filename i.e. logo.jpg
* Now create an new item - Text can be anything, but for the image choose a file with the same name as the file from the previous step i.e. logo.jpg. Please use an image different from the one of the item you picked in the first step.
* On the list of items scroll up or down to the item you pickled in the first step, and verify its image hasn't changed

----

*008 - Unability to edit a deleted item*

* Choose an item to edit, and click on the `Edit` button within the same row
* For the `image` field select a 320x320 jpg or png image (doesn't matter if it's the current one)
* For the `text` field type a new description or leave the current one
* Verify `Update Item` button is enabled
* DO NOT click on the `Update Item` button yet
* Instead click on the `Delete` button of the item you're editing
* Confirm the delete intent on the popup
* Verify the `Item Details` form is still on edit mode
* Click on the `Update Item` button
