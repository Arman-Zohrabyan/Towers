const Board = require('./board.js');
// const Game = require('./game.js');


let socket_user = {};

const disconnect = (io, socket) => () => {
    const socketId = socket.id;
    const userId = socket_user[socketId];

    Board(io, socket).removeUser(userId);
    delete socket_user[socket.id];
}

const storeUserId = (io, socket) => (userId) => {
    socket_user[socket.id] = userId;
}



const socketApi = (io) => (socket) => {
  socket.on('storeUserId', storeUserId(io, socket));


  socket.on('getRooms', Board(io, socket).getRooms);
  socket.on('createRoom', Board(io, socket).createRoom);
  socket.on('joinToRoom', Board(io, socket).joinToRoom);


  socket.on('disconnect', disconnect(io, socket));
};





module.exports = socketApi;
