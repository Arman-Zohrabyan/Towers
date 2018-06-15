module.exports = {
    userPosition: (rooms, userId) => {
        let result = false;
        Object.keys(rooms).forEach(roomId => {
            const keyOnArray = rooms[roomId].usersList.indexOf(userId);
            if (keyOnArray !== -1) {
                result = { roomId, keyOnArray };
                return;
            }
        });
        return result;
    }
};
