/**
 * Created By: Arman Zohrabyan
 */

const RoomsContainer = require('./classes/RoomsContainer.js');


const container = new RoomsContainer();

// start preview

container.createRoom('sasdczxczxc123123nj', 'Player 1');
container.userJoin('sasdczxczxc123123nj', 'sasdczxczxc123s123njfqw');
container.startGame('sasdczxczxc123123nj');

container.createRoom('sasdczxczxc123123njfac', 'Player 2');
container.userJoin('sasdczxczxc123123njfac', 'asd');
container.startGame('sasdczxczxc123123njfac');
container.userJoin('sasdczxczxc123123njfac', 'addsd');
container.userJoin('sasdczxczxc123123njfac', 'www');

container.createRoom('sasdczxczxc123123njfab', 'Player 3');
container.userJoin('sasdczxczxc123123njfab', 'assd');
container.startGame('sasdczxczxc123123njfab');
container.userJoin('sasdczxczxc123123njfab', 'adwqxxdsd');
container.userJoin('sasdczxczxc123123njfab', 'wwcxwxx');

container.createRoom('sasdczxczxc123123njfas', 'Player 4');

container.createRoom('sasdczxczxc123123njfassda', 'Player 5');

container.createRoom('sasdczxczxc123123njfddd', 'Player 6');
container.userJoin('sasdczxczxc123123njfddd', 'Andrey');

container.createRoom('sasdczxczxc123123njfdddd', 'Player 7');
container.userJoin('sasdczxczxc123123njfdddd', 'Andr');


// end preview


module.exports = (io) => {
  return {
    getRooms: () => {
      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    createRoom: ({ id, nickname }) => {
      container.createRoom(id, nickname);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    removeUser: (userId) => {
      container.fullRemoveUser(userId);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    joinToRoom: ({ roomId, userId }) => {
      container.userJoin(roomId, userId);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    },
    startingGame: (roomId) => {
      container.startGame(roomId);

      io.sockets.in('boardsRoom').emit('getRooms', container.rooms);
    }
  };
};
