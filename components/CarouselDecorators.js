import styled from "styled-components";
import Carousel from "nuka-carousel";

const CarouselButton = styled.button`
  border: 0;
  background: rgba(0,0,0,0.4);
  color: ${p => p.theme.colors.white};
  outline: 0;
  opacity: ${p => p.disabled ? 0.3 : 1};
  cursor: pointer;

  padding: ${p => p.theme.space(3)};

  display: none;
  ${p => p.theme.media.md`display: block;`}
`;

const Dot = styled.button`
  padding: ${p => p.theme.space(1)};
  border: 0;
  outline: 0;
  background: transparent;
  color: ${p => p.theme.colors.white};
  cursor: pointer;
  opacity: ${p => p.active ? 1 : 0.5};

  font-size: ${p => p.theme.modularScale(2)};
  ${p => p.theme.media.md`
    font-size: ${p.theme.modularScale(4)};
  `}
`;

const Dots = styled(props => {
  const indexes = [];
  for (var i = 0; i < props.slideCount; i += props.slidesToScroll) {
    indexes.push(i);
  }

  return (
    <ul className={props.className}>
      {indexes.map(index => (
        <li key={index}>
          <Dot
            active={props.currentSlide === index}
            onClick={() => props.goToSlide(index)}
          >
            •
          </Dot>
        </li>
      ))}
    </ul>
  );
})`
  position: relative;
  margin: 0;
  padding: 0;

  li {
    list-style-type: none;
    display: inline-block;
  }
`;

export default [
  {
    component: props => (
      <CarouselButton
        onClick={props.previousSlide}
        disabled={props.currentSlide === 0 && !props.wrapAround}
      >
        &lt;
      </CarouselButton>
    ),
    position: "CenterLeft",
  },
  {
    component: props => (
      <CarouselButton
        onClick={props.nextSlide}
        disabled={
          props.currentSlide + props.slidesToScroll >= props.slideCount &&
            !props.wrapAround
        }
      >
        &gt;
      </CarouselButton>
    ),
    position: "CenterRight",
  },
  {
    component: props => <Dots {...props} />,
    position: "BottomCenter",
  },
];
