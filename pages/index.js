import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { opacify } from "polished";

import Layout from "../components/Layout";
import Image from "../components/Image";
import artworks from "../data/artworks";

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 ${p => p.theme.space(-1)} ${p => p.theme.space(-2)};
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  text-transform: lowercase;
  font-size: ${p => p.theme.modularScale(3)};
  font-weight: regular;

  background-color: ${p => opacify(-0.3, p.theme.colors.blue)};
  color: ${p => p.theme.colors.white};

  transition: 0.3s ${props => props.theme.easings.cubicIn} opacity;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Artwork = styled(({ title, images, slug, path, ...props }) => (
  <div {...props}>
    <Link prefetch href={`/work?id=${slug}`} as={`/work/${slug}`}>
      <a>
        <Image src={images[0].path} width={500} height={500} />
        <Title>{title}</Title>
      </a>
    </Link>
  </div>
))`
  line-height: 0;
  width: 50%;
  ${p => `padding: 0 ${p.theme.space(1)} ${p.theme.space(2)};`}

	${p => p.theme.media.md`width: 33.33%;`}
	${p => p.theme.media.lg`width: 25%;`}

  a {
    display: inline-block;
    position: relative;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

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
