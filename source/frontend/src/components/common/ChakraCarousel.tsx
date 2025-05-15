import React, { useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useCarousel } from "./useCarousel";
import {
  CarouselContainer,
  CarouselTrackContainer,
  CarouselTrack,
  CarouselItemContainer,
  PrevButton,
  NextButton
} from "./styles";
import type { ChakraCarouselProps } from './types';

const ChakraCarousel: React.FC<ChakraCarouselProps> = ({ children, gap }) => {
  const {
    x,
    controls,
    trackRef,
    containerRef,
    isDragging,
    showPrevButton,
    showNextButton,
    handlePrev,
    handleNext,
    handleDragStart,
    handleDragEnd,
    updateTrackWidth
  } = useCarousel();

  useEffect(() => {
    updateTrackWidth();
  }, [children, updateTrackWidth]);

  return (
    <CarouselContainer>
      {showPrevButton && (
        <PrevButton
          aria-label="Previous"
          icon={<ChevronLeftIcon boxSize={6} />}
          onClick={handlePrev}
        />
      )}

      <CarouselTrackContainer ref={containerRef}>
        <CarouselTrack
          ref={trackRef}
          drag="x"
          dragConstraints={{
            left: -(trackRef.current?.scrollWidth || 0) - (containerRef.current?.offsetWidth || 0),
            right: 0,
          }}
          style={{ x }}
          animate={controls}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div style={{ display: 'flex', gap: gap }}>
            {children.map((child, index) => (
              <CarouselItemContainer
                key={index}
                isDragging={isDragging}
              >
                {child}
              </CarouselItemContainer>
            ))}
          </div>
        </CarouselTrack>
      </CarouselTrackContainer>

      {showNextButton && (
        <NextButton
          aria-label="Next"
          icon={<ChevronRightIcon boxSize={6} />}
          onClick={handleNext}
        />
      )}
    </CarouselContainer>
  );
};

export default ChakraCarousel;