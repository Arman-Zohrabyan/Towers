export const toggleChat = {
  type: 'CHAT_TOGGLE'
};

export const formBlurFocus = (activateForm) => ({
  activateForm,
  type: 'CHAT_FORM_BLUR_FOCUS'
});


export const newMessageReceived = (messageData) => ({
  messageData,
  type: 'CHAT_NEW_MESSAGE'
});
