/**
 * Created By: Arman Zohrabyan
 */

const ObjectId = require('mongoose').mongo.ObjectId;


module.exports = (io) => {
  return {
    /**
     * Sends new message to client
     */
    newMessage: (messageData) => {
      messageData.id = ObjectId();
      io.sockets.emit('newMessage', messageData);
    }
  };
};
