import React from 'react';
import styled from '@emotion/styled';
import viewportsJs from '../../js/viewports.json';
import colors from '../../js/colors';

import MaxWidth from '../MaxWidth';

const StyledFooter = styled.footer`
  display: flex;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  color: #fff;
  background-color: ${colors.blue};

  @media ${viewportsJs.sm} {
    padding-top: .5rem;
    padding-bottom: .5rem;
  }
`;

const FooterContent = styled.div`
  text-align: center;

  @media ${viewportsJs.sm} {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${viewportsJs.sm} {
    flex-direction: row;
  }
`;

const FooterNavItem = styled.a`
  margin-bottom: .5rem;
  color: inherit;
  text-decoration: none;

  @media ${viewportsJs.sm} {
    margin-bottom: 0;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const navItems = [
  {
    title: 'Kontakt',
    href: '/kontakt/',
  },
  {
    title: 'Impressum',
    href: '/impressum/',
  },
  {
    title: 'Datenschutz',
    href: '/datenschutz/',
  },
];

const Footer = () => {
  return (
    <StyledFooter>
      <MaxWidth>
        <FooterContent>
          <FooterNav>
            { navItems.map(({ title, href }) => (
              <FooterNavItem href={href} key={href}>{title}</FooterNavItem>
            )) }
          </FooterNav>

          <div>
            &copy; 2008 -
            {' '}
            { new Date().getFullYear()}
            {' '}
Rückenwind Lübeck
          </div>
        </FooterContent>
      </MaxWidth>
    </StyledFooter>
  );
};

export default Footer;
