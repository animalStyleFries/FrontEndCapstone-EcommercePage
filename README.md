# FrontEndCapstone-EcommercePage

The goal of this project was to create a front end page that could be used for an ecommerce website.

Main tech stack:
  React - Front end
  Axios - API requests
  Express - Back end (mainly used to optimize and to serve to AWS)
  Webpack - To put everything together

## Overview

  The overview is the top module of the webpage and allows the user to get information about the product, browse the styles and optionally add the product to a cart. The elements of this module includes:

  1. Image Gallery
  2. Product Information
  3. Style Selector
  4. Add to Cart

### Image Gallery

Feature: Allows user to browse through different images of the selected style of the selected product. Users may navigate by using thumbnails on the left side of the main image or by using the arrows. Also includes an expanded image function which users can click into and zoom in even further.

Breakdown: Everything is kept track by a react useState. This state exists in a parent component while the actual display of the images exists in children components. Since there is a single state, all image displaying components know exactly what to display!

### Product Information

Feature: Displays information about the product. The information is retrieved via API requests so nothing is hardcoded! Stars are accurate up to quarter star ratings. If an item is on sale, the original price will be crossed out and the new sale price will appear in bright red.

Breakdown: Not too much to breakdown here. The main tech here is simply doing API requests to get information to populate the fields.

### Style Selector

Feature: Shows and allows users to select different styles. Will show all avaliable styles, this also controls how every other element in the module works. For example, image displayed will be based on style selected.

Breakdown: The style state is at the highest level since this state is relevant to EVERY element.
  * Image Gallery: Needs to know style so it knows what image to display
  * Product Information: Needs to know style to know what price to display/if it's on sale.
  * Add To Cart: Needs to know style so it knows what sizes and how much of each quantity is in stock.

### Add to Cart

Feature: Allows user to choose size and quantity to add to cart. If there is no quantity, all options will be greyed out and disabled.

Breakdown: Add to cart options are completely controlled by the style state. Whenever the style state is updated, the Add to Cart component will scan through avaliable options by style and update the dropdown choices accordingly.


## Questions and Answers

  The Questions and Answers module is for user's searching related product's questions and their answers. The elements of this module includes:

  1. SearchBar
  2. Question and answer list
  3. Load more questions
  4. Add questions and answers

### SearchBar

Feature: this part is used for searching questions, questions include searching keywords will be displayed. All questions will appear in order of **'helpfulness'**. After typing 3 or more characters into the search bar the results will begin to filter to only those containing matching text.
If less than 3 characters, the results will go back to the original state.

### Question and answer list

Feature: this part will display each products' questions and each question's related answers. At default, it will display 2 questions and 2 answers. Answer will appear in order of **'helpfulness'** except **'Seller's** answer which will appear in the very first disregard the helpfulness. User can add his/her own answer to the question and can report the answer he/she dislikes. User can also click **'yes'** once to make some answers be more helpful.

### Load more questions

Feature: each clicking **'More Answered Questions'** button will show 2 more questions. When all questions have been displayed this button will disappear.

### Add questions and answers

  1. Add questions
  2. Add answers

Feature: The Add questions modal will be popped up after clicking 'Add a question +' button. It will require users to type question content they would like to ask, user's username and email. Upon clicking sumbit button, user's question has been added. Users can use searchbar to find their questions.

The Add answers modal will be popped up after clicking add answer link on the right side of each question. It will require users to type answer content they would like to give to this specific product, user's nickname and email. It's optional to upoload image files within answers. If users add images, their images will be uploaded to [Cloudinary](https://cloudinary.com/documentation/upload_widget_tutorial). The max numeber of images which can be added is 5. Upon clicking sumbit button, user's answer has been added. User can click left-sided load more answer link to find their newest answers. After clicking load more answer link, another 5 answers will appear. If all the answers have been displayed, the load more answer link will change to collapse answers. Click collapse answers, the answer list will go back to original state (2 answers with highest helpfulness. However, seller's answer will be displayed at the first).

