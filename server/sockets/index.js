// const Board = require('./board.js');
// const Game = require('./game.js');


let online = 0;

function disconnect() {
    online--;
}





const socketApi = (socket) => {
  online++;

  socket.on('disconnect', disconnect);
};





module.exports = socketApi;
