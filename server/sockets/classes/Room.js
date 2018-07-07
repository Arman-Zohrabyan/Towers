/**
 * Created By: Arman Zohrabyan
 *
 * Class for creating a separate room.
 */

class Room {
  constructor(creatorId, creatorName) {
    this.createdBy = creatorName;
    this.usersList = [creatorId];

    // TODO: 0 = waiting 1 = ready 2 = started
    this.status = 0;
  }

  /**
   * Adds user to the room.
   *
   * @param  {string}   userId   User's id.
   */
  appendUserOnRoom(userId) {
    // User can join only rooms with status 'waiting' or 'started'
    if (this.status === 1) return;

    this.usersList.push(userId);
    this.checkStatus(1);
  }

  /**
   * Checks status of the room and changes it by condition.
   *
   * @param  {number}   status   New status.
   */
  checkStatus(status) {
    if (this.status !== 2) {
      this.status = status;
    }
  }

  /**
   * Sets status 'started'.
   */
  setStatusStarted() {
    this.status = 2;
  }

  /**
   * Returns user position if user are in the room.
   *
   * @param  {string}   userId   User's id.
   * @return {boolean|number}    User position or false.
   */
  userPosition(userId) {
    const position = this.usersList.indexOf(userId);

    if (position !== -1) {
      return position;
    }
    return false;
  }

  /**
   * Removes user from the room.
   *
   * @param  {number}   position   Position in array.
   */
  removeUserByPosition(position) {
    this.usersList.splice(position, 1);
    this.checkStatus(0);
  }
}

module.exports = Room;
