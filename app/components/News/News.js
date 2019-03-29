import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import viewportsJs from '../../js/viewports.json';
import colors from '../../js/colors';

import { H3 } from '../Headline';
import RichText from '../RichText';

const StyledNews = styled.article`
  display: flex;
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
  margin-left: 1rem;
`;

const Img = styled.img`
  width: 100%;
  border: 1px solid #f2f2f2;

  ${StyledNews}:hover & {
    border-color: ${colors.blue};
  }
`;

const News = ({
  slug, title, image, content, isExerpt,
}) => {
  const img = image && {
    x1: `${image.src}?w=200&h=200&fit=fill`,
    x2: `${image.src}?w=400&h=400&fit=fill`,
  };

  if (isExerpt) {
    const exerp = content.content.find(el => el.nodeType === 'paragraph');
    content.content = [exerp];
  }

  // console.log(content);

  return (
    <StyledNews>
      <Content>
        <WrapTitle href={`/news/${slug}`}>
          <H3>{title}</H3>
        </WrapTitle>
        <RichText content={content} />
      </Content>
      <WrapImg href={`/news/${slug}`}>
        <Img
          src={img.x1}
          srcSet={`${img.x1} 1x, ${img.x2} 2x`}
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
  content: PropTypes.string.isRequired,
  isExerpt: PropTypes.bool,
};

export default News;
