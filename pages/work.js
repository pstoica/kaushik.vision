import React from "react";
import styled from "styled-components";
import { modularScale } from "polished";

import Layout from "../components/Layout";
import Image from "../components/Image";
import artworks from "../data/artworks";

const Wrapper = styled.div`
  display: flex;
  margin: 0 ${p => p.theme.space(-1)};

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

const Media = styled.div`
  ${p => p.theme.width(8 / 12)};
  padding-left: ${p => p.theme.space(1)};

  ${p => p.theme.media.md`padding-right: ${p => p.theme.space(1)}`}
  ${p => p.theme.media.lg`padding-right: ${p => p.theme.space(5)}`}

  img {
    display: block;
  }
`;

const FadingImage = styled(({ active, className, ...props }) => (
  <div className={className}><Image {...props} /></div>
))`
  position: relative;
  margin-right: -100%;
  width: 100%;
  float: left;
  transition: opacity 0.3s ${props => props.theme.easings.cubicIn};
  opacity: ${p => p.active ? 1 : 0};
`;

const PrimaryImage = styled(({ images, active, ...props }) => (
  <div {...props}>
    {images.map((image, i) => (
      <FadingImage
        src={image.path}
        key={image.path}
        active={i === active}
        width={850}
        height={550}
        crop="center"
      />
    ))}
  </div>
))`
  position: relative;
  margin-bottom: ${p => p.theme.space(1)};

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Thumbnail = styled.div`
  margin-right: ${p => p.theme.space(1)};
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.5};
  transition: 0.3s ${props => props.theme.easings.cubicInOut} opacity;

  &:hover {
    opacity: 1;
  }
`;

const Details = styled.div`
  flex: 1 1 auto;
  padding: 0 ${p => p.theme.space(1)};
`;

const Title = styled.h1`
  text-transform: lowercase;
  font-size: ${p => p.theme.modularScale(4)};
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

const GumroadButton = props => (
  <a
    className="gumroad-button"
    href="https://gum.co/demo"
    target="_blank"
    {...props}
  />
);

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { url: { query: { id } } } = props;
    const artwork = artworks.find(x => x.slug === id);

    this.state = {
      selectedImage: 0,
      artwork,
    };
  }

  selectImage(selectedImage) {
    this.setState({
      selectedImage,
    });
  }

  render() {
    const { artwork, selectedImage } = this.state;
    const mainImage = artwork.images[selectedImage];

    return (
      <Layout title={artwork.title}>
        <Wrapper>
          <Media>
            <PrimaryImage images={artwork.images} active={selectedImage} />

            <Thumbnails>
              {artwork.images.map((x, i) => (
                <Thumbnail
                  onClick={() => this.selectImage(i)}
                  active={selectedImage === i}
                >
                  <Image src={x.path} width={100} height={100} crop="entropy" />
                </Thumbnail>
              ))}
            </Thumbnails>
          </Media>

          <Details>
            <Title>{artwork.title}</Title>
            <Description>{artwork.description}</Description>
          </Details>
        </Wrapper>
      </Layout>
    );
  }
}
