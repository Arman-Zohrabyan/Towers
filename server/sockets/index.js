const Board = require('./board.js');
// const Game = require('./game.js');


let online = 0;

function disconnect() {
    online--;
}



const socketApi = (io) => (socket) => {
  online++;


  socket.on('getBoards', Board(online, io).getBoards)
  // socket.on('CreateBoard', Board(online, io).create)



  socket.on('disconnect', disconnect);
};





module.exports = socketApi;
