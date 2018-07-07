const initRooms = (container) => {
  // room 1
  container.createRoom('test1', 'Player 1');
  container.userJoin('test1', 'sasdczxczxc123s123njfqw');
  container.startGame('test1');

  // room 2
  container.createRoom('test2', 'Player 2');
  container.userJoin('test2', 'asd');
  container.startGame('test2');
  container.userJoin('test2', 'addsd');
  container.userJoin('test2', 'www');

  // room 3
  container.createRoom('test3', 'Player 3');
  container.userJoin('test3', 'assd');
  container.startGame('test3');
  container.userJoin('test3', 'adwqxxdsd');
  container.userJoin('test3', 'wwcxwxx');

  // room 4
  container.createRoom('test4', 'Player 4');

  // room 5
  container.createRoom('test5', 'Player 5');

  // room 6
  container.createRoom('test6', 'Player 6');
  container.userJoin('test6', 'Andrey');

  // room 7
  container.createRoom('test7', 'Player 7');
  container.userJoin('test7', 'Andr');
}


module.exports = {
  initRooms
};
