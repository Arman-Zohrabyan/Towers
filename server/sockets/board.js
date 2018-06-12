let arr = ['asd'];


module.exports = (online, io) => {
    return {
        // create: (col) => {
        //     arr.push(col);
        //     io.sockets.emit('CreateBoard', arr);
        // }
        getBoards: () => {
            io.sockets.emit('getBoards', arr);
        }
    };
};
