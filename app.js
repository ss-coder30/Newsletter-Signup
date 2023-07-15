const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

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

    var data = { // data to be sent to the mailchimp server
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data); // convert data to JSON

    const url = 'https://us21.api.mailchimp.com/3.0/lists/626f1ab708'; // url of the mailchimp server
 
const options = { // options for the request
    method: 'POST',
    auth: 'shaurya:1ddb6b3251edfecb3bc825d7ae5983c6-us21'
}

const request1 = https.request(url, options, (response) => { // make a request to the mailchimp server
    response.on('data', (data) => {
        console.log(JSON.parse(data));
    });
}); 

request1.write(jsonData); // write the data to the mailchimp server
request1.end(); // end the request
});



app.listen(3000, () => { // listen on port 3000
    console.log('Server is running on port 3000.');
})

// 1ddb6b3251edfecb3bc825d7ae5983c6-us21 - api key
// 626f1ab708 - list id