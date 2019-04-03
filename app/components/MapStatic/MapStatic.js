import React from 'react';

import mapSrc from './map.png';

const MapStatic = () => (
  <a style={{ display: 'block' }} href="https://bit.ly/rw_map" target="_blank" rel="noopener noreferrer">
    <img style={{ display: 'block' }} src={mapSrc} alt="Static Google Map" />
  </a>
);

export default MapStatic;
