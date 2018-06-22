/**
 * Created By: Arman Zohrabyan
 */


import React from 'react';
import { Launcher } from 'react-chat-window'

console.log(Launcher);

import './Chat.scss';

class Chat extends React.Component {

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
    renderCustomComponent(message);
  }

  render() {

    return (
      <div>
      </div>
    );
  }
};

export default Chat;
