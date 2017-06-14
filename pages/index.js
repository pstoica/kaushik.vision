import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { modularScale } from "polished";

import Layout from "../components/Layout";
import Image from "../components/Image";
import artworks from "../data/artworks";

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 ${p => p.theme.space(-1)};
`;

const Artwork = ({ title, images, slug, path }) => {
  const Wrapper = styled.div`
    ${p => `padding: 0 ${p.theme.space(1)} ${p.theme.space(1)};`}
    width: 50%;

  	${p => p.theme.media.md`width: 33.33%;`}
  	${p => p.theme.media.lg`width: 25%;`}

    a {
      display: inline-block;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  `;

  const Title = styled.h3`
    text-align: center;
    text-transform: lowercase;
    color: ${props => props.theme.colors.black};
    font-size: ${modularScale(1)};
    margin-top: ${p => p.theme.space(1)};
  `;

  return (
    <Wrapper>
      <Link prefetch href={`/work?id=${slug}`} as={`/work/${slug}`}>
        <a>
          <Image src={images[0].path} width={500} height={500} />
          <Title>{title}</Title>
        </a>
      </Link>
    </Wrapper>
  );
};

export default () => (
  <Layout>
    <Gallery>
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
    </Gallery>
  </Layout>
);
