import openSocket from 'socket.io-client';
let socket;


function beginSocket() {
    socket = openSocket('http://localhost:4000');
}

function endSocket() {
    socket.disconnect();
}


function getBoards(cb) {
    socket.on('getBoards', boards => cb(boards));
    socket.emit('getBoards');
}


export { beginSocket, endSocket, getBoards };