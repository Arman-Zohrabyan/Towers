/**
 * Created By: Arman Zohrabyan
 *
 * Boards page.
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Room from './Room.jsx';
import './BoardsPage.scss';


class BoardsPage extends Component {
  render() {
    const {
      myId,
      myNickname,
      iAmAlreadyCreatedTheRoom,
      myPosition,
      rooms,
      getEventAndAdditionalClass,
      createRoom
    } = this.props;

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
              iAmAlreadyCreatedTheRoom || myPosition ?
                <span className='boardsPage-container__header__info'>You are already in the room.</span> :
                <div className='boardsPage-button' onClick={createRoom}>
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
              const { additionalClasses, handleClickEvent } = getEventAndAdditionalClass(room, myId, myPosition);

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
   * Current user id
   */
  myId: PropTypes.string,
  /**
   * Current user nickname
   */
  myNickname: PropTypes.string,
  /**
   * Current user created room or not
   */
  iAmAlreadyCreatedTheRoom: PropTypes.boolean,
  /**
   * Current user position
   */
  myPosition: PropTypes.string,
  /**
   * Rooms list
   */
  rooms: PropTypes.object,
  /**
   * Function gets event and additional class for any rooms
   */
  getEventAndAdditionalClass: PropTypes.func,
  /**
   * Room creator function
   */
  createRoom: PropTypes.func,
  /**
   * Application route history
   */
  history: PropTypes.object
};


export default BoardsPage;
