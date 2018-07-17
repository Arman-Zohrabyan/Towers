import { cameraPosition } from '../helpers/camera.js';

const KEYS = {
  '37': 'LEFT',
  '39': 'RIGHT'
};

const keyDown = function(e = window.event) {
  const { keyCode } = e;
  let _cameraObj = {};

  switch (KEYS[keyCode]) {
    case 'LEFT':
      _cameraObj = cameraPosition(this.state, 'LEFT');
      this.setState(_cameraObj);
      break;

    case 'RIGHT':
      _cameraObj = cameraPosition(this.state, 'RIGHT');
      this.setState(_cameraObj);
      break;

    default:
      break;
  }
}

const keyUp = function(e = window.event) {
  const { cameraSpeed } = this.state;
  const { keyCode } = e;

  switch (KEYS[keyCode]) {
    case 'LEFT':
    case 'RIGHT':
      this.setState({cameraSpeed: 1});
      break;

    default:
      break;
  }
}

export {
  keyDown,
  keyUp
};
