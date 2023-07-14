const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express(); // create express app

app.use(bodyParser.urlencoded({extended: true})); // to use body-parser

app.use(express.static("public"));  // to use static files like css, images, etc.

app.get('/', (req, res) => { // get request to the home route
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => { // post request to the home route
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    console.log(firstName, lastName, email);
});

app.listen(3000, () => { // listen on port 3000
    console.log('Server is running on port 3000.');
})