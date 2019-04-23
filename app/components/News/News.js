import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import colors from '../../js/colors';

import { H3 } from '../Typography';
import { ImgContentful } from '../Img';
import Link from '../Link';
import RichText from '../RichText';

const StyledNews = styled.article`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const WrapTitle = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const WrapImg = styled.a`
  flex-shrink: 0;
  width: 33.3%;
  margin-left: 1rem;
  border: 1px solid ${colors.graylight};

  ${StyledNews}:hover & {
    border-color: ${colors.blue};
  }
`;

const News = ({
  slug, title, image, content, isExerpt,
}) => {
  const link = `/news/${slug}/`;

  const checkedContent = !isExerpt ? content : {
    ...content,
    content: [content.content.find(el => el.nodeType === 'paragraph')],
  };


  return (
    <StyledNews>
      <Content>
        <WrapTitle href={link}>
          <H3>{title}</H3>
        </WrapTitle>
        <RichText content={checkedContent} />
        {isExerpt && <Link href={link}>weiterlesen »</Link>}
      </Content>
      <WrapImg href={link}>
        <ImgContentful
          width={220}
          height={220}
          fit="fill"
          src={image.src}
          alt={image.alt} />
      </WrapImg>
    </StyledNews>
  );
};

News.defaultProps = {
  isExerpt: false,
};

News.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  content: PropTypes.object.isRequired,
  isExerpt: PropTypes.bool,
};

export default News;
