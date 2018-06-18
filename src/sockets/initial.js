const initial = (socket) => ({

    endSocket: () => {
      socket.disconnect();
    }

});

export default initial;
