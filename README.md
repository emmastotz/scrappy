### **Scrappy App**
#### Scrapes the New York Times and lets users make comments on the latest articles.

##### Scrappy Overview
* server.js (Sets up our app to use express and to listen at a port.)
* package.json
* package-lock.json
* routes
  * routes.js (Routes our functionality; GET/POST requests to database)
* models
  * Comment.js (Mongoose schema for comment data.)
  * Article.js (Mongoose schema for article data).
  * index.js (Boiler plate Mongoose file, requires all schema)
* public
  * assets
    * styles
      * style.css (Main stylesheet.)
    * img (All images used in project.)
    * js
      * index.js
      * myarticles.js
* views
  * index.handlebars
  * myartiles.handlebars
  * layouts
    * main.handlebars

##### Instructions to Run the App
* Clone the file from github. (https://github.com/emmastotz/scrappy)
* Install all dependencies needed to run the program ("npm install").
* Run the application using node in the command line ("node server.js") and open up browser with correct port to see the magic.

##### Technologies Used
* CSS3
* Bootstrap 4
* JavaScript/jQuery
* MongoDB 
* Node
* NPMs: Express, Handlebars, Mongoose

This app was created by Andy Tran, Alex Simuro, Emma Stotz, Juan Munoz and Sandy Enow