import React from 'react';
import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';
// import Fab from '@material-ui/core/Fab';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const data = [
  { cover: require('@site/static/img/homepage-carousel/1.png').default, title: 'Preview 1' },
  { cover: require('@site/static/img/homepage-carousel/2.png').default, title: 'Preview 2' },
  { cover: require('@site/static/img/homepage-carousel/3.png').default, title: 'Preview 3' },
  { cover: require('@site/static/img/homepage-carousel/4.png').default, title: 'Preview 4' },
  { cover: require('@site/static/img/homepage-carousel/5.png').default, title: 'Preview 5' },
  { cover: require('@site/static/img/homepage-carousel/6.png').default, title: 'Preview 6' },
  { cover: require('@site/static/img/homepage-carousel/7.png').default, title: 'Preview 7' },
];

// Very important to memoize your component!!!
// Also very imporant to set draggable to false on your slide if you want to use swipe!!!
const Slide = React.memo(function (props: StackedCarouselSlideProps) {
  const { data, dataIndex } = props;
  const { cover } = data[dataIndex];
  return (
    <div style={{ width: '100%', height: 450, userSelect: 'none' }}>
      <img
        style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: 10 }}
        draggable={false}
        src={cover}
      />
    </div>
  );
});

export default function ResponsiveCarousel() {
  // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
  // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
  // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
  // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
  const ref = React.useRef<typeof ResponsiveContainer>();
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* // ResponsiveContainer will have the same width as its parent element */}
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          else if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              data={data}
              carouselWidth={parentWidth}
              slideWidth={750}
              slideComponent={Slide}
              maxVisibleSlide={5}
              currentVisibleSlide={currentVisibleSlide}
              useGrabCursor={true}
            />
          );
        }}
      />
      <button onClick={() => ref.current.goBack()}>back</button>
      <button onClick={() => ref.current.goNext()}>next</button>
      {/* <Fab ... onClick={() => ref.current.goBack()}>
                <ArrowBackIcon />
            </Fab>
            <Fab ... onClick={() => ref.current.goNext()}>
                <ArrowForwardIcon />
            </Fab> */}
    </div>
  );
}
