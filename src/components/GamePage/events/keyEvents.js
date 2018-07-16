const KEYS = {
  '37': 'LEFT',
  '39': 'RIGHT'
}

const keyDown = function(e = window.event) {
  const { camera, cameraSpeed } = this.state;
  const { keyCode } = e;
  let _cameraObj = {};

  switch (KEYS[keyCode]) {
    case 'LEFT':
      if(cameraSpeed < 10) {
        _cameraObj.cameraSpeed = Math.ceil(cameraSpeed+1);
      }
      _cameraObj.camera = camera + cameraSpeed;
      this.setState(_cameraObj);
      break;

    case 'RIGHT':
      if(cameraSpeed < 10) {
        _cameraObj.cameraSpeed = Math.ceil(cameraSpeed+1);
      }
      _cameraObj.camera = camera - cameraSpeed;
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
