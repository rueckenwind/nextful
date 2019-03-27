import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';

import Logo from './Logo';

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vw /3);
  background-color: #ff0;

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
    transform: translateX(-50%);
    border-radius: 0 0 .5em .5em;
  }
`;

const LogoWrapper = styled.div`
  width: 90vw;

  @media ${viewportsJs.xs} {
    width: 30rem;
    max-width: 90vw;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: #f0f;
  object-fit: cover;
`;

const Header = ({ image }) => (
  <StyledHeader>
    <LogoLink href="/">
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </LogoLink>
    <StyledImg src={image} />
  </StyledHeader>
);

Header.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Header;
