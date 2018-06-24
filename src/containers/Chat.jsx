/**
 * Created By: Arman Zohrabyan
 */


import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Socket from '../sockets';
import ChatCustom from '../components/ChatCustom/ChatCustom.jsx';
import * as ChatActions from '../store/chat/actions';
  
function scrollToTop() {
  setTimeout( function() {
    const chatContent = document.getElementById('chat-content');
    if(chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }, 100);
}




class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    // TODO:   this.mounted   so bad solution!
    this.mounted = true;
    Socket.getMessage(messageData => {
      if (this.mounted) {
        scrollToTop();
        this.props.newMessage(messageData);
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    let { message } = this.state;
    message = message.trim();
    if(message.length) {
      const { myData } = this.props;
      const messageData = {
        message,
        sender: myData.nickname,
        senderId: myData.id
      };
      Socket.sentMessage(messageData);
      this.setState({message: ''});
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  isMyMessage = (senderId) => {
    const { myData } = this.props;
    return myData.id === senderId;
  }

  render() {
    const { chat, toggleChat, formBlurFocus } = this.props;

    return (
      <ChatCustom
        messageValue={this.state.message}
        chatIsOpened={chat.isOpened}
        formIsActive={chat.formIsActive}
        budget={chat.budget}
        toggleShowChat={toggleChat}
        formBlurFocus={formBlurFocus}
        messages={chat.messages}
        isMyMessage={this.isMyMessage}
        handleOnChange={this.handleOnChange}
        handleOnSubmit={this.handleOnSubmit}
      />
    );
  }
}




function mapStateToProps(state) {
  return {
    chat: state.chat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleChat: () => {
      dispatch(ChatActions.toggleChat);
      scrollToTop();
    },
    formBlurFocus: (activateForm) => {
      dispatch(ChatActions.formBlurFocus(activateForm));
    },
    newMessage: (messageData) => {
      dispatch(ChatActions.newMessageReceived(messageData));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
