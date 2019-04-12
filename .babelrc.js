module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['inline-react-svg', {
      svgo: {
        plugins: [{
          cleanupIDs: false,
          removeTitle: true,
        },
        { addAttributesToSVGElement: {
          attributes: [
            'width="100%"',
            'height="100%"',
            'preservesspectratio="xMinYMid meet"',
          ]
        }}]
      }
    }],
    'emotion',
  ]
};
