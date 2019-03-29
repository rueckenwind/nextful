import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  FaInstagram as IconInstagram,
  FaFacebookF as IconFacebook,
  FaTwitter as IconTwitter,
} from 'react-icons/fa';
import upperCaseFirst from 'upper-case-first';

import colors from '../../js/colors';
import times from '../../js/times';

const networks = {
  instagram: {
    href: 'https://bit.ly/rw_instagram',
    Icon: IconInstagram,
  },
  facebook: {
    href: 'https://bit.ly/rw_facebook',
    Icon: IconFacebook,
  },
  twitter: {
    href: 'https://bit.ly/rw_twitter',
    Icon: IconTwitter,
  },
};


const SocialLink = styled.a`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.75rem;
  height: 1.75rem;
  color: #fff;
  text-decoration: none;
  background-color: #ccc;
  border-radius: 50%;
  transition-duration: ${times.transition};
  transition-property: background-color, transform;

  :hover {
    background-color: ${({ network }) => colors[network]};
    transform: rotate(-20deg);
  }
`;

const SocialIcon = ({ network }) => {
  console.log(network);
  const { href, Icon } = networks[network];
  return (
    <SocialLink
      network={network}
      href={href}
      title={upperCaseFirst(network)}>
      <Icon />
    </SocialLink>
  );
};

SocialIcon.propTypes = {
  network: PropTypes.oneOf([
    'instagram',
    'facebook',
    'twitter',
  ]).isRequired,
};

export default SocialIcon;
