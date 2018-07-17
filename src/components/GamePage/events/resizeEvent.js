const PAGE_WIDTH = 2000;
const CANVAS_HEIGHT = 640;

const handleResize = function(e = window.event) {
  const { clientWidth, clientHeight } = document.body;
  const width = parseInt(CANVAS_HEIGHT*clientWidth/clientHeight);
  const max = PAGE_WIDTH - width;

  this.setState({
    screen : {
      width: clientWidth,
      height: clientHeight
    },
    canvas: {
      width,
      height: CANVAS_HEIGHT
    },
    cameraValuesInterval: {
      min: 0,
      max: max < 0 ? 0 : max
    }
  });
}

export { handleResize };
