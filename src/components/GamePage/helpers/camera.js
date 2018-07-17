let interval;

const onEnterCameraTriangle = function(direction = '') {
  if(!interval) {
    interval = setInterval(() => {
      const _cameraObj = cameraPosition(this.state, direction);
      this.setState(_cameraObj);
    }, 50);
  }
}

const onLeaveCameraTriangle = function() {
  this.setState({cameraSpeed: 1});
  interval && clearInterval(interval);
  interval = undefined;
}

const cameraPosition = (state = {}, direction = '') => {
	let actualPosition;
	const _cameraObj = {};
  const { camera, cameraSpeed, cameraValuesInterval } = state;
  
  if (cameraSpeed < 18) {
    _cameraObj.cameraSpeed = Math.ceil(cameraSpeed + 1);
  }

  if (direction === 'LEFT') {
  	actualPosition = camera - cameraSpeed;
  } else if (direction === 'RIGHT') {
  	actualPosition = camera + cameraSpeed;
  }

  _cameraObj.camera = _getPosition(cameraValuesInterval, actualPosition);

  return _cameraObj;
}

const _getPosition = (valuesInterval, value) => {
	if(value < valuesInterval.min) {
		return valuesInterval.min;
	} else if(value > valuesInterval.max) {
		return valuesInterval.max;
	}
	return value
}

export {
	cameraPosition,
  onEnterCameraTriangle,
  onLeaveCameraTriangle
};
