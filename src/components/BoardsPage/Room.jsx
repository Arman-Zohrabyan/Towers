import React, { Component } from 'react';
import './BoardsPage.scss';


// STATUSES ===>      0 === waiting, 1 === ready, 2 === started
const statuses = ['Waiting', 'READY', 'Started'];

class Room extends Component {
  render() {
    const { createdBy, status, iAmIn, onRoom } = this.props;

    let additionalClasses = '';

    if(iAmIn) {
        additionalClasses += ' boardsPage-room__iAmIn';
    }

    if(createdBy === 'ME' && iAmIn && status === 1) {
        additionalClasses += ' boardsPage-room__ready';
    } else if(status === 1) {
        additionalClasses += ' boardsPage-room__hide boardsPage-room__ready';
    } else if(status === 2) {
        additionalClasses += ' boardsPage-room__started';
    }

    return (
        <div className={`boardsPage-room${additionalClasses}`}>
            <div className="boardsPage-room__content">
                <i className='fas fa-check' />
                <span className="boardsPage-room__content__status">
                    <span>status: </span>
                    {statuses[status]}
                </span>
                <span className="boardsPage-room__content__creator">
                    <span>created by: </span>
                    {createdBy === 'ME' ? 'YOU' : createdBy}
                </span>
                <span className="boardsPage-room__content__usersIn">
                    <span>on room: </span>
                    {onRoom}
                </span>
            </div>
        </div>
    );
  }
}


export default Room;
