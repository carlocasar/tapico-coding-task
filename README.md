# tapico-coding-task
WebApp that communicates with Spotify, Twitter, and Youtube to obtain the trends of a pre-selected country.

This project has to main folders, api, and app-tapico. 
The first one contains the node server that performs the calls to the api when the front-end makes a request(when you select a country in the dropdown list). 
The second one is the react app, where we have all the visuals and the communication with the node server.

### How to run the project

To run this project, first, you will have to install all the dependencies, writing on a terminal in the root of both folders (api and app-tapico), ```npm install```. 
After that, you will need to start both projects, writing in the root of both folders ```npm start ```.
Finally, a new window will open on your default browser with the Url: http://localhost:3000/

### Important decisions and why

The keys to connecting to the 3rd-party APIs are hard-coded, which is not a good practice in production code, but because it is just a coding task I thought that it will be easier this way. 

There are only 6 countries to choose from, because getting all the countries for each API was out of the scope of the task, and it would not add any benefits, only unclear code because each API has a different way to identify the countries. 

### api 

In the path /api/routes/ there are three files: spotifyApiConnection.js, twitterApiConnection.js, youtubeApiConnection.js. 
These files are the ones that communicate with the respective third-party APIs and return the information that we need, using the country that we have selected in the front-end. 
The keys to connecting to the 3rd-party APIs are hard-coded, which is not a good practice in production code, but because it is just a coding task I thought that it will be easier this way. 

### app-tapico 

This is the front end of the application. 
In the App.js file, there is all the HTML code and the calls to our API when we select a country in the dropdown list. 
When a country is selected, we will see in the front end the title with URL to the top three trends on the respective apps(Spotify, Youtube, and Twitter).
The visuals of the App are simple, as I thought that the importance of this task was on successful communication with the 3rd party APIs.


