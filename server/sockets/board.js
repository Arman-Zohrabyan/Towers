let obj = {
    'sasdczxczxc123123njfas': {
        createdBy: "Valodik",
        usersIn: ['sasdczxczxc123123njfas'],
        status: 0
    },
    'sasdczxczxc123123njfddd': {
        createdBy: "Addsdsdsd",
        usersIn: ['sasdczxczxc123123njfddd', 'sasdczxczxc123123njfqw'],
        status: 1
    },
    'sasdczxczxc123123nj': {
        createdBy: "Valodik",
        usersIn: ['sasdczxczxc123123nj', 'sasdczxczxc123123njfqw'],
        status: 2
    },
    'sasdczxczxc123123njfac': {
        createdBy: "Valodik",
        usersIn: ['sasdczxczxc123123njfas', 'asd', 'addsd', 'www'],
        status: 2
    }
};

const userPosition = (rooms, userId) => {
    let result = false;

    Object.keys(obj).forEach(roomId => {
        const keyOnArray = obj[roomId].usersIn.indexOf(userId);
        if(keyOnArray !== -1) {
            result = { roomId, keyOnArray };
            return;
        }
    })

    return result;
}


module.exports = (io, socket) => {
    return {
        getRooms: () => {
            io.sockets.emit('getRooms', obj);
        },
        createRoom: ({id, nickname}) => {
            if(userPosition(obj, id)) return;

            obj[id] = {
                createdBy: nickname,
                usersIn: [id],
                status: 0
            };

            io.sockets.emit('getRooms', obj);
        },
        removeUser: (userId) => {
            if(obj[userId]) {
                delete obj[userId];
            } else {
                const userPos = userPosition(obj, userId);
                if(userPos) {
                    const { roomId, keyOnArray } = userPos;
                    obj[roomId].usersIn.splice(keyOnArray, 1);
                    if(obj[roomId].usersIn.length === 1) {
                        obj[roomId].status = 0;
                    }
                }
            }

            io.sockets.emit('getRooms', obj);
        },
        joinToRoom: ({id, room}) => {
            if(userPosition(obj, id)) return;

            obj[room].usersIn.push(id);
            if(obj[room].status === 0) {
                obj[room].status = 1;
            }

            io.sockets.emit('getRooms', obj);
        }
    };
};
