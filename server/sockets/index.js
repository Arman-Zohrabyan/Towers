/**
 * Created By: Arman Zohrabyan
 */

/* eslint-disable */
const Board = require('./board.js');
// const Game = require('./game.js');


const socket_user = {};

const disconnect = (io, socket) => () => {
  const socketId = socket.id;
  const userId = socket_user[socketId];

  Board(io, socket).removeUser(userId);
  delete socket_user[socket.id];
};

const storeUserId = (io, socket) => (userId) => {
  socket_user[socket.id] = userId;
};


const socketApi = (io) => (socket) => {
  socket.on('storeUserId', storeUserId(io, socket));


  socket.on('socketJoinBoards', function() {
    socket.join('boardsRoom');
  });
  socket.on('socketLeftBoards', function() {
    socket.leave('boardsRoom');
  });

  socket.on('getRooms', Board(io, socket).getRooms);
  socket.on('createRoom', Board(io, socket).createRoom);
  socket.on('joinToRoom', Board(io, socket).joinToRoom);
  socket.on('leaveRoom', Board(io, socket).removeUser);
  socket.on('startStatus', Board(io, socket).startingGame);







  socket.on('socketJoinRoom', function(roomId) {
    socket.join(roomId);
  });
  socket.on('socketLeaveRoom', function(roomId) {
    socket.leave(roomId);
  });

  socket.on('event', function(roomId) {
    io.sockets.in(roomId).emit('event', 'HelloWorld');
  });




  socket.on('disconnect', disconnect(io, socket));
};


module.exports = socketApi;
/* eslint-enable */
