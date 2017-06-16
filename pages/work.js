import React from "react";
import styled from "styled-components";

import Carousel from "nuka-carousel";
import CarouselDecorators from "../components/CarouselDecorators";
import Layout from "../components/Layout";
import Image from "../components/Image";
import artworks from "../data/artworks";

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
  margin: ${p => p.theme.space(1)} auto 0;

  ${p => p.theme.media.md`display: flex;`}
`;

const Thumbnail = styled.div`
  margin-right: ${p => p.theme.space(1)};
  cursor: pointer;
  opacity: ${props => (props.active ? 1 : 0.5)};
  transition: 0.3s ${props => props.theme.easings.cubicInOut} opacity;

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
  constructor(props) {
    super(props);
    const { url: { query: { id } } } = props;
    const artwork = artworks.find(x => x.slug === id);

    this.state = {
      artwork,
    };

    this.setCarouselData = Carousel.ControllerMixin.setCarouselData;
  }

  render() {
    const { artwork, carousel = { state: { currentSlide: 0 } } } = this.state;

    return (
      <Layout
        title={artwork.title}
        subtitle={artwork.description}
        pageTitle={artwork.title}
      >
        <Wrapper>
          <Carousel
            ref={c => (this.carousel = c)}
            decorators={CarouselDecorators}
            data={() => this.setState({ carousel: this.carousel })}
          >
            {artwork.images.map((image, i) =>
              <Image
                src={image.path}
                key={image.path}
                width={850}
                height={550}
                crop="center"
                imgProps={{
                  onLoad: () => {
                    if (i === 0) {
                      this.carousel.setDimensions();
                    }
                  },
                  style: {
                    width: "100%",
                    height: "auto",
                  },
                }}
              />
            )}
          </Carousel>

          <Thumbnails>
            {artwork.images.map((x, i) =>
              <Thumbnail
                key={i}
                onClick={() => this.carousel.goToSlide(i)}
                active={carousel && carousel.state.currentSlide === i}
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
