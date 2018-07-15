/**
 * Created By: Arman Zohrabyan
 */

const Board = require('./board.js');

const userSocket = {};


module.exports = (io, socket) => {
  return {
    /**
     * Removes user from userSocket object
     */
    removeUser: () => {
      const socketId = socket.id;
      const socketUser = invert(userSocket);
      const userId = socketUser[socketId];

      Board(io, socket).removeUser(userId);
      delete userSocket[userId];

      io.sockets.emit('usersOnline', Object.keys(userSocket).length);
    },
    /**
     * Adds user to userSocket object
     */
    storeUserId: (userId) => {
      userSocket[userId] = socket.id;

      io.sockets.emit('usersOnline', Object.keys(userSocket).length);
    }
  };
};


function invert(obj) {
  return Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));
}
