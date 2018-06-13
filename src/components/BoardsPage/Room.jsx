import React, { Component } from 'react';
import './BoardsPage.scss';


// STATUSES ===>      0 === waiting, 1 === ready, 2 === started
const statuses = ['Waiting', 'READY', 'Started'];

class Room extends Component {
  render() {
    const { room, myId, handleClick } = this.props;
    let additionalClasses = '';

    if (room.usersIn.includes(myId)) {
      additionalClasses += ' boardsPage-room__iAmIn';
    }

    if (room.id === myId && room.status === 1) {
      additionalClasses += ' boardsPage-room__ready';
    } else if (room.status === 1) {
      additionalClasses += ' boardsPage-room__hide boardsPage-room__ready';
    } else if (room.status === 2) {
      additionalClasses += ' boardsPage-room__started';
    }

    return (
      <div className={`boardsPage-room${additionalClasses}`} onClick={() => handleClick(myId, room.id)}>
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
            {room.usersIn.length}
          </span>
        </div>
      </div>
    );
  }
}


export default Room;
