import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Grid from "styled-components-grid";
import { Margin, p, mt } from "styled-components-spacing";
import { modularScale } from "polished";

import Main from "../components/Main";
import Image from "../components/Image";
import artworks from "../data/artworks";

const Artwork = ({ title, images, slug, path }) => {
  const Wrapper = styled.div`
    ${p(3)};

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
    ${mt(3)};
  `;

  return (
    <Grid.Unit width={1 / 4}>
      <Wrapper>
        <Link prefetch href={`/work?id=${slug}`} as={`/work/${slug}`}>
          <a>
            <Image src={images[0].path} width={500} height={500} />
            <Title>{title}</Title>
          </a>
        </Link>
      </Wrapper>
    </Grid.Unit>
  );
};

export default () => (
  <Main>
    <Head>
      <title>Vision Kaushik</title>
    </Head>
    <Grid>
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
      {artworks.map(artwork => <Artwork {...artwork} key={artwork.slug} />)}
    </Grid>
  </Main>
);
