const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


const app = express();
const server = http.Server(app);
const io = socketIO(server);


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


server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});


const socketApi = require('./server/sockets');
io.on('connection', socketApi);
