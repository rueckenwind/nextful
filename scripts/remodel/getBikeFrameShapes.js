const getBikeFrameShapeProps = require('./getBikeFrameShapeProps');

module.exports = function getBikes(res) {
  const bikeFrameShapesCleaned = res.items.map(item => getBikeFrameShapeProps(item));

  return {
    bikeFrameShapesCleaned,
  };
};
