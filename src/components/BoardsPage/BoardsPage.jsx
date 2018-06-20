/**
 * Created By: Arman Zohrabyan
 *
 * Boards page.
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Room from './Room.jsx';
import User from '../../modules/User';
import Helper from '../../../common/helper';
import Socket from '../../sockets';
import './BoardsPage.scss';

const colors = ['yellow', 'green', 'red'];


class BoardsPage extends Component {
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

  goToGameRoom = (roomId) => {
    setTimeout(() => {
      this.props.history.push(`/room/${roomId}`);
    }, 800);
  }

  render() {
    const { myId, myNickname, rooms } = this.state;
    const iAmAlreadyCreatedTheRoom = Object.keys(rooms).includes(myId);
    this.myPosition = Helper.userPosition(rooms, myId);


    return (
      <div className='boardsPage'>
        <div className='boardsPage-container'>
          <div className='boardsPage-container__header'>
            <span className='boardsPage-container__header__h1'>GAME BOARDS</span>
            <span className='boardsPage-container__header__you'>
              <span>Your Nickname:</span>
              <span>{` ${myNickname}`}</span>
            </span>
            {
              iAmAlreadyCreatedTheRoom || this.myPosition ?
                <span className='boardsPage-container__header__info'>You are already in the room.</span> :
                <div className='boardsPage-button' onClick={() => {
                  Socket.createRoom({ id: myId, nickname: myNickname });
                }}
                >
                  <p className='boardsPage-button__btnText'>CREATE NEW GAME</p>
                  <div className='boardsPage-button__btnTwo'>
                    <p className='boardsPage-button__btnText2'>
                      <i className='fas fa-plus' />
                    </p>
                  </div>
                </div>
            }
          </div>
          {
            Object.keys(rooms).map((id, key) => {
              const room = rooms[id];
              room.id = id;

              let handleClickEvent = () => {
                Socket.joinToRoom({ roomId: room.id, userId: myId });
              };
              let additionalClasses = ` ${colors[room.status]}`;

              if (this.myPosition) {
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

              return (
                <Room
                  key={key}
                  myId={myId}
                  room={room}
                  handleClick={handleClickEvent}
                  additionalClass={additionalClasses}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}


BoardsPage.propTypes = {
  /**
   * Application route history
   */
  history: PropTypes.object
};


export default BoardsPage;
