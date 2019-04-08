import React from 'react';
import styled from '@emotion/styled';

import abus from './svgs/abus-logo.svg';
import bosch from './svgs/bosch-logo.svg';
import brooksEngland from './svgs/brooks-logo.svg';
import buschUndMueller from './svgs/busch-und-mueller-logo.svg';
import ergotec from './svgs/ergotec-logo.svg';
import magura from './svgs/magura-logo.svg';
import rieseUndMueller from './svgs/riese-und-mueller-logo.svg';
import schwalbe from './svgs/schwalbe-logo.svg';
import shimano from './svgs/shimano-logo.svg';
import veloDeVille from './svgs/velo-de-ville-logo.svg';

import viewportsJs from '../../js/viewports.json';

const Partner = () => {
  const partners = [
    veloDeVille,
    schwalbe,
    buschUndMueller,
    abus,
    bosch,
    rieseUndMueller,
    brooksEngland,
    ergotec,
    shimano,
    magura,
  ];

  const links = {
    veloDeVille: 'https://www.velo-de-ville.com/',
  };

  const Grid = styled.section`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;

    @media ${viewportsJs.sm} {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media ${viewportsJs.md} {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  `;

  return (
    <Grid>
      { partners.map((PartnerSvg) => {
        const hasLink = Object.keys(links).includes(PartnerSvg.name);
        return (
          <div key={PartnerSvg.name}>
            { hasLink ? (
              <a href={links[PartnerSvg.name]} target="_blank" rel="noopener noreferrer">
                <PartnerSvg />
              </a>
            ) : (
              <PartnerSvg />
            ) }
          </div>
        );
      }) }
    </Grid>
  );
};

export default Partner;
