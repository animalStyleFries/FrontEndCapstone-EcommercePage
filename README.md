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

Feature: Displays information about the product. Stars are accurate up to quarter star ratings.

