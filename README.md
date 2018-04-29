# Guarden HTTP REST Server
## Monash University Hard Hackathon 2018 - Team 3

Our entry for the inaugral Monash University hard hackathon. 24 hour hardware hackathon. 
Check the web application out at http://guarden.herokuapp.com

Guarden is an all-in-one plant management system. It notifies user if there are weeds in your backyard, logs the temperature, humidity and soil moisture content. 

This repository was the main HTTP REST server that was in charge of hosting the user interface and a way for the Raspberry Pi Zero W to store data on the mongoDB database. 

# Documentation
General overview of all endpoints.

Base URI: https://guarden.herokuapp.com

|Endpoint|Method|Description|
|--------|------|-----------|
|/api/upload|POST|Allows user to upload jpg files to server|
|/api/sensor|GET|Get sensor data stored on mongoDB|
|/api/sensor|POST|Add sensor data stored on mongoDB|
|/api/spray|GET|Get the whole history of the spray bottle being open and closed|
|/api/spray|POST|Update whether the spray bottle has been pressed or not|

# More Information:
## Infrastructure
![Imgur](https://i.imgur.com/wH4rseE.jpg)
Seen above was the main infrastructure of our project. Sensors would be connected to the Arduino, which would then be connected to the Raspberry Pi Zero W. The Raspberry Pi would run a python script which would send data to the HTTP server, featured in this repository. Users were able to upload pictures to the server, send data in JSON format and control the Arduino through a web interface.

## User Interface
![Imgur](https://i.imgur.com/mswnZsJ.png)
On the left of the interface is a live photo stream of the Raspberry Pi Zero W which updates every 1 second. The Raspberry Pi actually uses some image recognition algorithm to detect if the picture has weeds. It will also number the number of weeds on the screen too.
On the right hand side of the UI are simple temperature, humidity and soil moisture content graphs that have data stored onto a mongoDB database.

To host the web application, I used heroku to host a node.js application which would serve html pages with bootstrap as the front-end framework. This was chosen as it allowed us to run the app on mobile (seen below) as well.

![Imgur](https://i.imgur.com/SJSd1Jg.jpg)
