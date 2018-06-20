/**
 * Created By: Arman Zohrabyan
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BoardsPage.scss';

// STATUSES ===>      0 === waiting, 1 === ready, 2 === started
const statuses = ['Waiting', 'READY', 'Started'];


class Room extends Component {
  render() {
    const { room, myId, handleClick, additionalClass } = this.props;

    return (
      <div className={`boardsPage-room${additionalClass}`} onClick={handleClick}>
        <div className='boardsPage-room__content'>
          <i className='fas fa-check' />
          <span className='boardsPage-room__content__status'>
            <span>status: </span>
            {statuses[room.status]}
          </span>
          <span className='boardsPage-room__content__creator'>
            <span>created by: </span>
            {room.id === myId ? 'YOU' : room.createdBy}
          </span>
          <span className='boardsPage-room__content__usersIn'>
            <span>on room: </span>
            {room.usersList.length}
          </span>
        </div>
      </div>
    );
  }
}


Room.propTypes = {
  /**
   * Room data
   */
  room: PropTypes.object,
  /**
   * Current user id
   */
  myId: PropTypes.string,
  /**
   * Room click event handle
   */
  handleClick: PropTypes.func,
  /**
   * Additional class for component
   */
  additionalClass: PropTypes.string
};


export default Room;
