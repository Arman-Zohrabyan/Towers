/**
 * Created By: Arman Zohrabyan
 *
 * Boards page.
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BoardsPage from '../../components/BoardsPage/BoardsPage.jsx';

import User from '../../modules/User';
import Helper from '../../../common/helper';
import Socket from '../../sockets';

const colors = ['yellow', 'green', 'red'];


class Boards extends Component {
  constructor(props) {
    super(props);
    const data = User.data;

    this.state = {
      rooms: {},
      myId: data.id,
      myNickname: data.nickname
    };
  }

  componentDidMount() {
    Socket.joinBoards();

    // TODO:   this.mounted   so bad solution!
    this.mounted = true;
    Socket.getRooms((rooms) => {
      if (this.mounted) {
        this.setState({ rooms });
      }
    });
  }

  componentDidUpdate() {
    const { rooms } = this.state;
    if (this.myPosition) {
      const { status } = rooms[this.myPosition.roomId];
      if (status === 2) {
        this.goToGameRoom(this.myPosition.roomId);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    Socket.leaveBoards();
  }

  getEventAndAdditionalClass(room, myId, myPosition) {
    let handleClickEvent = () => {
      Socket.joinToRoom({ roomId: room.id, userId: myId });
    };
    let additionalClasses = ` ${colors[room.status]}`;

    if (myPosition) {
      const iAmInThisRoom = room.usersList.includes(myId);
      if (iAmInThisRoom) {
        handleClickEvent = () => {
          Socket.leftRoom(myId);
        };
        additionalClasses += ' boardsPage-room__iAmIn';
      }
      if (room.id === myId && room.status === 1) {
        handleClickEvent = () => {
          Socket.startingGame(room.id);
        };
        additionalClasses += ' boardsPage-room__ready';
      } else if (!iAmInThisRoom) {
        handleClickEvent = () => (console.warn('Please wait.'));
        additionalClasses += ' boardsPage-room__hide';
      }
    } else if (room.status === 1) {
      handleClickEvent = () => (console.warn('Please wait.'));
      additionalClasses += ' boardsPage-room__hide';
    } else if (room.status === 2) {
      handleClickEvent = () => {
        Socket.joinToRoom({ roomId: room.id, userId: myId });
      };
      additionalClasses += ' boardsPage-room__started';
    }

    return {
      additionalClasses,
      handleClickEvent
    };
  }

  goToGameRoom = (roomId) => {
    setTimeout(() => {
      this.props.history.push(`/room/${roomId}`);
    }, 800);
  }

  createRoom = () => {
    const { myId, myNickname } = this.state;
    Socket.createRoom({ id: myId, nickname: myNickname });
  }

  render() {
    const { myId, myNickname, rooms } = this.state;
    const iAmAlreadyCreatedTheRoom = Object.keys(rooms).includes(myId);
    this.myPosition = Helper.userPosition(rooms, myId);


    return (
      <BoardsPage
        myId={myId}
        myNickname={myNickname}
        iAmAlreadyCreatedTheRoom={iAmAlreadyCreatedTheRoom}
        myPosition={this.myPosition}
        rooms={rooms}
        getEventAndAdditionalClass={this.getEventAndAdditionalClass}
        createRoom={this.createRoom}
      />
    );
  }
}

Boards.propTypes = {
  /**
   * Application route history
   */
  history: PropTypes.object
};


export default Boards;
