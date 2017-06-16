import React from "react";
import styled from "styled-components";

import Carousel from "react-slick";
import Layout from "../components/Layout";
import Image from "../components/Image";
import artworks from "../data/artworks";

import "../styles/slick";

const Wrapper = styled.div`
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

const Thumbnails = styled.div`
  display: none;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${p => `${p.theme.space(4)} 0 ${p.theme.space(1)}`};

  ${p => p.theme.media.md`display: flex;`}
`;

const Thumbnail = styled.div`
  margin-right: ${p => p.theme.space(1)};
  cursor: pointer;
  opacity: ${props => (props.active ? 1 : 0.5)};

  &:hover {
    opacity: 1;
  }
`;

const Details = styled.div`
  text-align: center;
  margin: ${p => `${p.theme.space(2)} 0 ${p.theme.space(4)}`};
`;

const Title = styled.h2`
  text-transform: lowercase;
  font-size: ${p => p.theme.modularScale(4)};
  font-weight: bold;
  margin-bottom: ${p => p.theme.space(1)};
`;

const Description = styled.div``;

const PurchaseInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${p => p.theme.space(4)};
`;

const Price = styled.span`
  font-size: ${p => p.theme.modularScale(2)};
  font-family: ${p => p.theme.fonts.primary};
  margin-right: ${p => p.theme.space(2)};
`;

const AddButton = styled.a`
  display: block;
  padding: ${p => `${p.theme.space(1)} ${p.theme.space(2)}`};
  border: 0;
  background-color: ${p => p.theme.colors.blue};
  color: ${p => p.theme.colors.white};
  text-transform: lowercase;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.modularScale(1)};
  font-weight: bold;
`;

export default class WorkPage extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const artwork = artworks.find(x => x.slug === id);
    return { artwork };
  }

  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
    };
  }

  render() {
    const { artwork } = this.props;
    const { currentSlide } = this.state;

    return (
      <Layout
        title={artwork.title}
        subtitle={artwork.description}
        pageTitle={artwork.title}
      >
        <Wrapper>
          <Carousel
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            beforeChange={i => this.setState({ currentSlide: i })}
            ref={c => (this.carousel = c)}
          >
            {artwork.images.map((image, i) =>
              <div key={image.path}>
                <Image
                  src={image.path}
                  height={550}
                  fit="fill"
                  color="#fff"
                  faces={false}
                  imgProps={{
                    style: {
                      width: "100%",
                    },
                  }}
                />
              </div>
            )}
          </Carousel>

          <Thumbnails>
            {artwork.images.map((x, i) =>
              <Thumbnail
                key={i}
                onClick={() => this.carousel.slickGoTo(i)}
                active={currentSlide === i}
              >
                <Image src={x.path} width={100} height={100} crop="entropy" />
              </Thumbnail>
            )}
          </Thumbnails>
        </Wrapper>
      </Layout>
    );
  }
}
