const initialState = {
  online: 0,
  budget: 0,
  isOpened: false,
  formIsActive: false,
  maximumMessages: 20,
  messages: []
};


export default function reduce(state = initialState, action = {}) {
  let _state;
  switch (action.type) {
    case 'CHAT_TOGGLE': {
      _state = { ...state };
      if (_state.isOpened) {
        _state.budget = 0;
      }
      _state.isOpened = !_state.isOpened;
      return _state;
    }

    case 'CHAT_FORM_BLUR_FOCUS': {
      _state = { ...state };
      _state.formIsActive = action.activateForm;
      return _state;
    }

    case 'CHAT_ONLINE_USERS': {
      _state = { ...state };
      _state.online = action.online;
      return _state;
    }

    case 'CHAT_NEW_MESSAGE': {
      _state = { ...state };
      const messages = _state.messages;
      _state.messages.push(action.messageData);
      if (!_state.isOpened) {
        _state.budget += 1;
      }
      if (_state.messages.length > _state.maximumMessages) {
        _state.messages.shift();
      }
      return _state;
    }

    default:
      return state;
  }
}
