import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';
import colors from '../../js/colors';

import Logo from './Logo';
import { ImgContentful } from '../Img';

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

const ImgWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vw / 3);
  overflow: hidden;
  background-color: ${colors.grayDark};

  @media ${viewportsJs.xs} {
    height: 100%;
  }
`;

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewportWidth: undefined,
    };
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
    const { image } = this.props;

    return (
      <StyledHeader>
        <LogoLink href="/" title="Zur Startseite">
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </LogoLink>
        { image && this.state.viewportWidth && (
          <ImgWrap>
            <ImgContentful
              src={image.src}
              width={this.state.viewportWidth}
              alt={image.alt} />
          </ImgWrap>
        ) }
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
};

export default Header;
