import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { H3 } from '../Typography';
import { ImgContentful } from '../Img';
import defaultBikeImg from './bike.png';
import colors from '../../js/colors';
import times from '../../js/times';

const Teaser = styled.a`
  display: grid;
  grid-template-columns: 33% auto;
  grid-column-gap: 1rem;
  color: inherit;
  text-decoration: none;
`;
const TeaserSmall = styled.a`
  color: inherit;
  text-decoration: none;
`;

const ImgWrap = styled.div`
  border: 1px solid ${colors.graylightest};
  transition: border-color ${times.transition};

  ${Teaser}:hover &,
  ${TeaserSmall}:hover & {
    border-color: ${colors.blue};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: .5rem;
`;

const SubHeader = styled.div`
  font-size: .75rem;
  font-weight: bold;
`;

const bikeLink = slug => `/fahrrad/${slug}/`;

export const BikeTeaserImg = ({ image, slug }) => (
  <TeaserSmall href={bikeLink(slug)}>
    <ImgWrap>
      <ImgContentful
        width={220}
        height={220}
        fit="fill"
        src={image.src}
        alt={image.alt} />
    </ImgWrap>
  </TeaserSmall>
);

BikeTeaserImg.defaultProps = {
  image: {
    src: defaultBikeImg,
    alt: 'Default Bike Image',
  },
};

BikeTeaserImg.propTypes = {
  slug: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};

export const BikeTeaser = ({
  name, image, slug, category, frameShapes, status,
}) => (
  <Teaser href={bikeLink(slug)}>
    <ImgContentful
      width={220}
      height={220}
      fit="fill"
      src={image.src}
      alt={image.alt} />
    <Grid>
      <H3>{ name }</H3>

      <div>
        <SubHeader>Kategorie</SubHeader>
        { category.name }
      </div>

      <div>
        <SubHeader>Rahmenform</SubHeader>
        { frameShapes.map(frameShape => frameShape.name).join(', ') }
      </div>

      <div>
        <SubHeader>Status</SubHeader>
        { status }
      </div>
    </Grid>
  </Teaser>
);

BikeTeaser.defaultProps = {
  image: {
    src: defaultBikeImg,
    alt: 'Default Bike Image',
  },
  frameShapes: [],
};

BikeTeaser.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  frameShapes: PropTypes.array,
  category: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
};
