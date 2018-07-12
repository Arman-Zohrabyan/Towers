/**
 * Created By: Arman Zohrabyan
 */

module.exports = (io, socket) => {
  return {
    /**
     * Socket joins to game room
     */
    socketJoin: (roomId) => {
      socket.join(roomId);
    },
    /**
     * Socket leaves to game room
     */
    socketLeave: (roomId) => {
      socket.leave(roomId);
    },
    /**
     *
     */
    event: (roomId) => {
      io.sockets.in(roomId).emit('event', 'HelloWorld');
    }
  };
};
