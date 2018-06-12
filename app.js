const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

// tell the app to look for static files in these directories
app.use(express.static('./dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));



const api = require('./server/routes/api');
app.use('/api', api);



app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});


const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
