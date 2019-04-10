import React from 'react';
import styled from '@emotion/styled';

import viewportsJs from '../../js/viewports.json';

import MaxWidth from '../MaxWidth';
import SocialIcon from '../SocialIcon';

const StyledMenu = styled.div`
  margin-bottom: 1.25rem;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .15);
`;

const MenuContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${viewportsJs.xs} {
    justify-content: space-between;
  }
`;

const MenuNav = styled.nav`
  display: flex;
  justify-content: center;
`;

const MenuNavItem = styled.a`
  ${({ index }) => index === 0 && 'display: none;'}
  padding-top: .375rem;
  padding-bottom: .375rem;
  color: inherit;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  @media ${viewportsJs.xs} {
    ${({ index }) => index === 0 && 'display: block;'}
    padding-top: .75rem;
    padding-bottom: .75rem;
  }

  @media ${viewportsJs.sm} {
    padding-top: 1rem;
    padding-bottom: 1rem;

    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
`;

const SocialButtons = styled.div`
  display: none;

  @media ${viewportsJs.xs} {
    display: flex;
  }
`;

const SocialButton = styled.div`

  @media ${viewportsJs.xs} {
    &:not(:last-child) {
      margin-right: .75rem;
    }
  }

  @media ${viewportsJs.sm} {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;


const navItems = [
  {
    title: 'Startseite',
    href: '/',
  },
  {
    title: 'Fahrräder',
    href: '/fahrraeder/',
  },
  {
    title: 'News',
    href: '/news/',
  },
  {
    title: 'Kontakt',
    href: '/kontakt/',
  },
];

const socialIcons = [
  'instagram',
  'facebook',
  'twitter',
];

const Menu = () => {
  return (
    <StyledMenu>
      <MaxWidth>
        <MenuContent>
          <MenuNav>
            { navItems.map(({ title, href }, index) => (
              <MenuNavItem index={index} key={href} href={href}>{title}</MenuNavItem>
            )) }
          </MenuNav>

          <SocialButtons>
            { socialIcons.map(network => (
              <SocialButton key={network}>
                <SocialIcon network={network} />
              </SocialButton>
            )) }
          </SocialButtons>
        </MenuContent>
      </MaxWidth>
    </StyledMenu>
  );
};

export default Menu;
