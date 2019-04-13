import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';
import colors from '../../js/colors';

import Logo from './Logo';
import { Img } from '../Img';

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${viewportsJs.xs} {
    height: 30vh;
  }
`;

const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: .75em 1em .5em;
  background-color: #fff;

  @media ${viewportsJs.xs} {
    position: absolute;
    top: 0;
    left: 50%;
    width: auto;
    border-radius: 0 0 .5em .5em;
    transform: translateX(-50%);
  }
`;

const LogoWrapper = styled.div`
  width: 90vw;

  @media ${viewportsJs.xs} {
    width: 30rem;
    max-width: 90vw;
  }
`;

const StyledImg = styled(Img)`
  width: 100%;
  height: calc(100vw / 3);
  background-color: ${colors.graydark};
  object-fit: cover;

  @media ${viewportsJs.xs} {
    height: 100%;
  }
`;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewportWidth: 320,
    };

    this.image = props.images.length > 0 && props.images[getRandomInt(props.images.length)];
  }

  componentDidMount() {
    const devicePixelRatio = window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio;

    this.setState((currentState) => { // eslint-disable-line react/no-did-mount-set-state
      let viewportWidth = Math.floor(window.innerWidth * devicePixelRatio);
      if (viewportWidth > 4000) viewportWidth = 4000;
      if (currentState.viewportWidth !== viewportWidth) {
        return { viewportWidth };
      }
    });
  }

  render() {
    return (
      <StyledHeader>
        <LogoLink href="/" title="Zur Startseite">
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </LogoLink>
        { this.image && (
          <StyledImg
            src={`${this.image.src}?w=${this.state.viewportWidth}&fm=jpg&q=85&fl=progressive`}
            srcWebp={`${this.image.src}?w=${this.state.viewportWidth}&fm=webp`}
            alt={this.image.alt} />
        ) }
      </StyledHeader>
    );
  }
}

Header.defaultProps = {
  images: [],
};

Header.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  })),
};

export default Header;
