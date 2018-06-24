const initialState = {
    budget: 7,
    isOpened: false,
    formIsActive: false
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
      console.log(action);
      _state.formIsActive = action.activateForm;
      return _state;
    }

    default:
      return state;
  }
}
