/**
 * Created By: Arman Zohrabyan
 */


import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ChatCustom from '../components/ChatCustom/ChatCustom.jsx';
import * as ChatActions from '../store/chat/actions';


class Chat extends React.Component {
  render() {
    const { chat, toggleChat, formBlurFocus } = this.props;

    return (
      <ChatCustom
        chatIsOpened={chat.isOpened}
        formIsActive={chat.formIsActive}
        budget={chat.budget}
        toggleShowChat={toggleChat}
        formBlurFocus={formBlurFocus}
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
    },
    formBlurFocus: (activateForm) => {
      dispatch(ChatActions.formBlurFocus(activateForm));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
