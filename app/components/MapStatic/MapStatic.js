import React from 'react';

import { Img } from '../Img';
import mapSrcPng from './map.png';
import mapSrcWebp from './map.webp';

const MapStatic = () => (
  <a style={{ display: 'block' }} href="https://bit.ly/rw_map" target="_blank" rel="noopener noreferrer">
    <Img
      style={{ display: 'block' }}
      src={mapSrcPng}
      srcWebp={mapSrcWebp}
      alt="Static Google Map" />
  </a>
);

export default MapStatic;
