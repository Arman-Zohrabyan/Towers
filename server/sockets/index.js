/**
 * Created By: Arman Zohrabyan
 */

const Board = require('./board.js');
const Chat = require('./chat.js');
const User = require('./user.js');
const Game = require('./game.js');



const socketApi = (io) => (socket) => {
  // chat
  socket.on('newMessage', Chat(io, socket).newMessage);
  // board
  socket.on('socketJoinBoards', Board(io, socket).socketJoin);
  socket.on('socketLeftBoards', Board(io, socket).socketLeave);
  socket.on('getRooms', Board(io, socket).getRooms);
  socket.on('createRoom', Board(io, socket).createRoom);
  socket.on('joinToRoom', Board(io, socket).joinToRoom);
  socket.on('leaveRoom', Board(io, socket).removeUser);
  socket.on('startStatus', Board(io, socket).startingGame);
  //game
  socket.on('socketJoinRoom', Game(io, socket).socketJoin);
  socket.on('socketLeaveRoom', Game(io, socket).socketLeave);
  socket.on('event', Game(io, socket).event);
  // initial
  socket.on('storeUserId', User(io, socket).storeUserId);
  socket.on('disconnect', User(io, socket).removeUser); // socket disconnect
};


module.exports = socketApi;
