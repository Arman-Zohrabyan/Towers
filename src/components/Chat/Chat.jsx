/**
 * Created By: Arman Zohrabyan
 */


import React from 'react';


import './Chat.scss';



class Chat extends React.Component {
  render() {
    return (

      <div className="my-Chat">
        <div className='my-Chat_launcher'>
          <img className='my-Chat_launcher__open' src='/images/chat/chat-icon.svg' />
          <img className='my-Chat_launcher__close' src='/images/chat/close-icon.png' />
        </div>
      </div>
    );
  }
}

export default Chat;
