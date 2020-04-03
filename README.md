<div align="center">
  <img width="32" height="32" src="https://i.imgur.com/Ce1wCWt.png" alt="logo"> <h1>CompactOperations++</h1>
</div>

An ExtJS application for flight dispatchers and airline companies to instantly visualize problems when there are deviations from the regular schedule.

It makes use of my <a href="https://github.com/Lyut/aims-webroster-view">aims-webroster-view</a> class, modified in order to feed the data to an API and serve it within a CRUD context.

It is written in ExtJS, making it accessible via browser also to tablets and most smartphones.

## Configuration
The project is structured in two folders, an API (aims-api) and the Compact application (TimesSquare).
From now on, we will be talking about the Compact application unless explicitly mentioned otherwise.

Add Ext SDK into the project folder.
You need to edit resources\data\appconfig.js adding your own endpoint URL without leading slash.
<img src="https://i.imgur.com/7MOrE3c.png">
Start up the API with npm start and make sure the endpoint connection is working, otherwise you will get an 'Error in Service'.
<img src="https://i.imgur.com/NrtJ9AO.png">

Now you should be able to log in using a dummy admin account, "admin":"test". You can create additional accounts sending POST requests to /Users/, or you can tweak it to work with your own API.
You will be greeted by the Gantt chart until your session token expires.
<img src="https://i.imgur.com/vmZC2yU.png">

You may now run 'build' from Sencha Cmd.

Please note that this software was made for free in spare time, it is still heavily a work in progress and should *NEVER* be used in real Flight Operations.
A lot of tweaking and adjustments would be required anyways to synchronize the flight data with your airline's operations.

There are still many "bandaid" fixes, as sometimes I ran into issues that I couldn't fix in more 'elegant' ways.

Consider this source only as educational.

It is my first ExtJS project and I am still learning, feel free to make your own pull requests.

## API

The API was realized using loopback 3's default example auth app. All the unnecessary node modules have been left out from the folder as they were quite big in size.
It uses MongoDB as datastore.

## Contact

I can be reached by email at priyom [at] live [dot] ru
