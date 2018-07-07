/**
 * Created By: Arman Zohrabyan
 */

const RoomsContainer = require('./classes/RoomsContainer.js');
const { initRooms } = require('../../preview/init.js');


const container = new RoomsContainer();
initRooms(container);


module.exports = (io) => {
  return {
    /**
     * Sends to the client list of the rooms
     */
    getRooms: () => {
      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    /**
     * Creates new room and sends to the client list of the rooms
     */
    createRoom: ({ id, nickname }) => {
      container.createRoom(id, nickname);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    /**
     * Removs user form the room and sends to the client list of the rooms
     */
    removeUser: (userId) => {
      container.fullRemoveUser(userId);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    /**
     * Adds user to the room and sends to the client list of the rooms
     */
    joinToRoom: ({ roomId, userId }) => {
      container.userJoin(roomId, userId);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    /**
     * Changes room status to 'started' and sends to the client list of the rooms
     */
    startingGame: (roomId) => {
      container.startGame(roomId);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    }
  };
};
