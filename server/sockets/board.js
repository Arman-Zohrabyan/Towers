const RoomsContainer = require('./classes/RoomsContainer.js');


const container = new RoomsContainer();

// start preview
container.createRoom('sasdczxczxc123123njfas', 'Valodik');

container.createRoom('sasdczxczxc123123njfddd', 'Addsdsdsd');
container.userJoin('sasdczxczxc123123njfddd', 'sasdczxczxc123123njfqw');

container.createRoom('sasdczxczxc123123nj', 'Valodik1');
container.userJoin('sasdczxczxc123123nj', 'sasdczxczxc123s123njfqw');
container.startGame('sasdczxczxc123123nj');

container.createRoom('sasdczxczxc123123njfac', 'Valodik2');
container.userJoin('sasdczxczxc123123njfac', 'asd');
container.startGame('sasdczxczxc123123njfac');
container.userJoin('sasdczxczxc123123njfac', 'addsd');
container.userJoin('sasdczxczxc123123njfac', 'www');
// end preview


module.exports = (io) => {
    return {
        getRooms: () => {
            io.sockets.emit('getRooms', container.rooms);
        },
        createRoom: ({ id, nickname }) => {
            container.createRoom(id, nickname);

            io.sockets.emit('getRooms', container.rooms);
        },
        removeUser: (userId) => {
            container.fullRemoveUser(userId);

            io.sockets.emit('getRooms', container.rooms);
        },
        joinToRoom: ({ roomId, userId }) => {
            container.userJoin(roomId, userId);

            io.sockets.emit('getRooms', container.rooms);
        }
    };
};
