# Search APIs

**DESCRIPTION:** API search engine that returns *cards* from either GIPHY or OMDB.


![App Tutorial](GifTastic.gif)


**USE**
* User selects either the GIPHY or OMDB radio button and then creates a query inside the input field below.
* By hitting the ADD button, the value of the input field will be used to create a button for future use.
* Hitting the newly created buttons will conduct an API call with the button's text as the search query.
* If the API returns results, they will be formatted and populated in the main body of the app.
* For GIFS, clicking the card will switch the image from still to animated.
* For OMDB cards, hovering over will reveal more detail about the movie/show.
* For all cards, pressing the "+" button will move that card into the FAVORITES field.
* Hitting any of the clear buttons will empty the dynamically added html out of the corresponding containers

**PROGRAMMING / FUNCTIONALITY**

* App is built using the following languages/technologies:
  - *HTML* 
  - *CSS* 
  - *JavaScript*
  - *AJAX API calls*
  - *jQuery*
* Designed to be responsive across devices.


**FILE STRUCTURE**

```
.
├── GifTastic.gif
├── README.md
├── assets
│   ├── css
│   │   ├── reset.css
│   │   └── style.css
│   ├── images
│   │   ├── favicon.ai
│   │   ├── favicon.png
│   │   └── icons.ai
│   └── javascript
│       └── functions.js
└── index.html
```