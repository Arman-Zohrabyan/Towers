import User from '../../modules/User';

const data = User.data;

export default {
  message: '',
  myId: data.id,
  screen: {
    width: 1,
    height: 1
  },
  canvas: {
    width: 640,
    height: 640
  },
  context: null,
  camera: 0,
  cameraSpeed: 1,
  cameraValuesInterval: {
    min: 0,
    max: 0
  }
};
