const { request, response } = require('express');
// require express //
const express = require('express')
// install and require nedb to store data // 
const Datastore = require('nedb');
// create app var to start use expess to Listen to the server, html files and json data //
const app = express();
app.listen(3000, () => console.log("Listening at port 3000"));
app.use(express.static('public'))
app.use(express.json({limit: "1mb"}))

// creating database var to create a new file to store the data // 
const database = new Datastore('database.db');
database.loadDatabase();

// api routing to post the data // 
app.post('/api', (request,response) =>{
    console.log(request.body)
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log(database);
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon,
        mood: data.mood,
        day: data.day,
    });
} )