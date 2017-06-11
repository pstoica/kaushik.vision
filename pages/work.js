import React from "react";
import Head from "next/head";
import styled from "styled-components";

import Main from "../components/Main";
import Image from "../components/Image";
import artworks from "../data/artworks";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default ({ url: { query: { id } } }) => {
  const artwork = artworks.find(x => x.slug === id);
  return (
    <Main>
      <Head>
        <title>{artwork.title} | Vision Kaushik</title>
      </Head>
      <div>
        {artwork.title}
        {artwork.images.map(x => (
          <Image src={x.path} width={500} height={500} crop="entropy" />
        ))}
      </div>
    </Main>
  );
};
