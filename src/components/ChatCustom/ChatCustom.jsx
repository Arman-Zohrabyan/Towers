/**
 * Created By: Arman Zohrabyan
 */


import React, { Fragment } from 'react';
import './ChatCustom.scss';



class Chat extends React.Component {
  render() {
    const {
      chatIsOpened,
      formIsActive,
      budget,
      toggleShowChat,
      formBlurFocus
    } = this.props;
    const activeClass = formIsActive ? 'active' : '';

    return (
      <div className='my-chat'>
        <div className='my-chat_launcher' onClick={toggleShowChat}>
          {chatIsOpened ?
            <img className='my-chat_launcher__close' src='/images/chat/close-icon.png' /> :
            <Fragment>
              {budget ? <span className='my-chat_launcher__budget'>{budget}</span> : ''}
              <img className='my-chat_launcher__open' src='/images/chat/chat-icon.svg' />
            </Fragment>
          }
        </div>


        { chatIsOpened &&
          <div className='my-chat_window'>
            <div className='my-chat_window_header'>
              <img className='my-chat_window_header__image' src='https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png' />
              <div className='my-chat_window_header__title'>Welcome ^^</div>
              <div className='my-chat_window_header__close-button' onClick={toggleShowChat}>
                <img src='/images/chat/close-icon.png' />
              </div>
            </div>
            <div className='my-chat_window_messages'>
              <div className='my-chat_window_messages__message'>
                <div className='my-chat_window_messages__message__sent'>
                  <div className='my-chat_window_messages__message__sender'>You</div>
                  <div className='my-chat_window_messages__message__text'>Why don't they have salsa on the table?
                  </div>
                </div>
              </div>
              <div className='my-chat_window_messages__message'>
                <div className='my-chat_window_messages__message__received'>
                  <div className='my-chat_window_messages__message__sender'>Valodik</div>
                  <div className='my-chat_window_messages__message__text'>What do you need salsa for?
                  </div>
                </div>
              </div>
            </div>
            <form className={`my-chat_window_form ${activeClass}`}>
              <input
                placeholder='Write a message...'
                className='my-chat_window_form__text'
                onFocus={() => {formBlurFocus(true)}}
                onBlur={() => {formBlurFocus(false)}}
              />
              <div className='my-chat_window_form__buttons'>
                <div className='my-chat_window_form__button send-button'>
                  <button className='send-button_icon-wrapper'>
                    <svg version='1.1' className='send-button_icon-wrapper__icon' xmlns='http://www.w3.org/2000/svg'
                      x='0px' y='0px' width='37.393px'
                      height='37.393px' viewBox='0 0 37.393 37.393'
                    >
                      <g>
                        <path d='M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263 L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08 l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061 c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z' />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default Chat;