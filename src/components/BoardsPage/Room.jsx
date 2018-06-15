import React, { Component } from 'react';
import './BoardsPage.scss';


// STATUSES ===>      0 === waiting, 1 === ready, 2 === started
const statuses = ['Waiting', 'READY', 'Started'];
const colors = ['yellow', 'green', 'red'];

class Room extends Component {
    render() {
        const { room, myId, handleClick, amIInTheRoom } = this.props;
        let additionalClasses = ` ${colors[room.status]}`;

        if (amIInTheRoom) {
            const iAmInThisRoom = room.usersList.includes(myId);
            if (iAmInThisRoom) {
                additionalClasses += ' boardsPage-room__iAmIn';
            }
            if (room.id === myId && room.status === 1) {
                additionalClasses += ' boardsPage-room__ready';
            } else if (!iAmInThisRoom) {
                additionalClasses += ' boardsPage-room__hide';
            }
        } else if (room.status === 1) {
            additionalClasses += ' boardsPage-room__hide';
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
                        {room.usersList.length}
                    </span>
                </div>
            </div>
        );
    }
}


export default Room;
