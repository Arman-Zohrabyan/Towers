/**
 * Created By: Arman Zohrabyan
 *
 * Class which contains and control rooms.
 */

const Room = require('./room.js');


class RoomsContainer {
    constructor() {
        this.rooms = {};
    }

    /**
     * Adds new room.
     *
     * @param  {string}   creatorId     Creator's id.
     * @param  {string}   creatorName   Creator's name.
     */
    createRoom(creatorId, creatorName) {
        // Don't created a room if it's already created.
        if (this.rooms[creatorId]) return;

        this.rooms[creatorId] = new Room(creatorId, creatorName);
    }

    /**
     * Adds new user in a specific room.
     *
     * @param  {string}   roomId        Id of the room.
     * @param  {string}   userId        New user's id.
     */
    userJoin(roomId, userId) {
        // Doesn't do anything if the user is already in the room.
        if (this.getUserPosition(userId)) return;

        this.rooms[roomId].appendUserOnRoom(userId);
    }

    /**
     * Starts game in the room.
     *
     * @param  {string}   roomId        Id of the room.
     */
    startGame(roomId) {
        this.rooms[roomId].setStatusStarted();
    }

    /**
     * If user is in one of the rooms, returns user position and room id.
     *
     * @param  {string}   userId   User's id.
     * @return {boolean|object}    Position or false.
     */
    getUserPosition(userId) {
        let result = false;
        Object.keys(this.rooms).forEach(roomId => {
            const poition = this.rooms[roomId].userPosition(userId);
            if (poition) {
                result = { roomId, poition };
                return;
            }
        });
        return result;
    }

    /**
     * If user is in one of the rooms, returns user position and room id.
     *
     * @param  {string}   userId   User's id.
     */
    fullRemoveUser(userId) {
        if (this.rooms[userId]) {
            delete this.rooms[userId];
        } else {
            const userPos = this.getUserPosition(userId);
            if (userPos) {
                const { roomId, poition } = userPos;
                this.rooms[roomId].removeUserByPosition(poition);
            }
        }
    }
}


module.exports = RoomsContainer;
