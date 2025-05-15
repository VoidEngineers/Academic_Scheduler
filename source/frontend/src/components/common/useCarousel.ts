import { useState, useCallback, useRef, useEffect } from 'react';
import { useAnimation, useMotionValue, PanInfo } from 'framer-motion';

export type UseCarouselProps = {
  slideOffset?: number;
}

export const useCarousel = ({ slideOffset = 300 }: UseCarouselProps = {}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth);
    }
  }, []);

  const updateTrackWidth = useCallback(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth);
    }
  }, []);

  const handlePrev = useCallback(() => {
    const newPosition = Math.min(trackPosition + slideOffset, 0);
    setTrackPosition(newPosition);
    controls.start({ x: newPosition });
  }, [trackPosition, controls, slideOffset]);

  const handleNext = useCallback(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const newPosition = Math.max(
      trackPosition - slideOffset,
      -(trackWidth - containerWidth)
    );
    setTrackPosition(newPosition);
    controls.start({ x: newPosition });
  }, [trackPosition, trackWidth, controls, slideOffset]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const velocity = info.velocity.x;
      const containerWidth = containerRef.current?.offsetWidth || 0;

      if (Math.abs(velocity) >= 1000) {
        const direction = velocity < 0 ? -1 : 1;
        const newPosition = Math.max(
          Math.min(trackPosition + direction * slideOffset, 0),
          -(trackWidth - containerWidth)
        );
        setTrackPosition(newPosition);
        controls.start({ x: newPosition });
      } else {
        controls.start({ x: trackPosition });
      }

      setIsDragging(false);
    },
    [trackPosition, trackWidth, controls, slideOffset]
  );

  const showPrevButton = trackPosition < 0;
  const showNextButton = trackPosition > -(trackWidth - (containerRef.current?.offsetWidth || 0));

  return {
    x,
    controls,
    trackRef,
    containerRef,
    isDragging,
    trackPosition,
    showPrevButton,
    showNextButton,
    handlePrev,
    handleNext,
    handleDragStart,
    handleDragEnd,
    updateTrackWidth,
  };
};