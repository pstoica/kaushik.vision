import React from "react";
import styled from "styled-components";
import ReactCSSTransitionReplace from "react-css-transition-replace";
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

const PrimaryImage = styled(({ image, ...props }) => (
  <div {...props}>
    <ReactCSSTransitionReplace
      transitionName="cross-fade"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      <Image
        src={image.path}
        key={image.path}
        width={850}
        height={550}
        crop="center"
      />
    </ReactCSSTransitionReplace>
  </div>
))`
  margin-bottom: ${p => p.theme.space(1)};

  .cross-fade-leave {
    opacity: 1;
  }
  .cross-fade-leave.cross-fade-leave-active {
    opacity: 0;
    transition: opacity 0.3s ${props => props.theme.easings.cubicIn};
  }

  .cross-fade-enter {
    opacity: 0;
  }
  .cross-fade-enter.cross-fade-enter-active {
    opacity: 1;
    transition: opacity 0.3s ${props => props.theme.easings.cubicIn};
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
  transition: 0.15s ${props => props.theme.easings.cubicInOut} opacity;
`;

const Details = styled.div`
  flex: 1 1 auto;
  padding: 0 ${p => p.theme.space(1)};
`;

const Title = styled.h1`
  text-transform: lowercase;
  font-size: ${modularScale(4)};
`;

const AddButton = styled.button`
  display: block;
  margin-top: ${p => p.theme.space(4)};
  padding: ${p => p.theme.space(1)};
  border: 0;
  background-color: ${p => p.theme.colors.blue};
  color: ${p => p.theme.colors.white};
  text-transform: lowercase;
  font-family: Hind;
`;

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
            <PrimaryImage image={artwork.images[selectedImage]} />

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
            3x3x5 inches

            <AddButton>buy</AddButton>
          </Details>
        </Wrapper>
      </Layout>
    );
  }
}
