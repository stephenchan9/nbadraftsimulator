const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const port = 3001;
const apiHelper = require("./yahooHelper");
const config = require("../config/keys.json");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// Yahoo fantasy api call code.
app.get('/getAPIResponse', (req, res) => {
    console.log(req);
    // API code will be here
    apiHelper.make_API_call(`https://api.login.yahoo.com/oauth2/request_auth?client_id=${config.clientId}&redirect_uri=localhost:3000&response_type=code&language=en-us`)
    .then((response) =>{
        console.log(response);
        res.json(response);
    })
    .catch((err)=>{
        console.log(err);
        // res.send(err);
    })
})

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);