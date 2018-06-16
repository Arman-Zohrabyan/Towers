import openSocket from 'socket.io-client';
let socket;


function beginSocket(userId) {
    socket = openSocket('http://localhost:4000');

    socket.on('connect', () => {
        socket.emit('storeUserId', userId);
    });
}

function endSocket() {
    socket.disconnect();
}

function getRooms(cb) {
    socket.on('getRooms', boards => cb(boards));
    socket.emit('getRooms');
}

function createRoom(userData) {
    socket.emit('createRoom', userData);
}

function joinToRoom(data) {
    socket.emit('joinToRoom', data);
}

function leftRoom(userId) {
    socket.emit('leaveRoom', userId);
}

export { beginSocket, endSocket, getRooms, createRoom, joinToRoom, leftRoom };
