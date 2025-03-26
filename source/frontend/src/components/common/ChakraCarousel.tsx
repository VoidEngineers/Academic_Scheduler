import React, { useEffect, useState, useCallback } from "react";
import { Box, Flex, IconButton, useMediaQuery, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, useAnimation, useMotionValue, PanInfo } from "framer-motion";

interface ChakraCarouselProps {
  children: React.ReactNode[];
  gap: number;
}

const ChakraCarousel: React.FC<ChakraCarouselProps> = ({ children, gap }) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const [isMobile] = useMediaQuery("(max-width: 48em)");
  const [snapPosition, setSnapPosition] = useState(0);
  const [dragging, setDragging] = useState(false);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth);
    }
  }, [children]);

  const handlePrev = useCallback(() => {
    const newPosition = Math.min(trackPosition + 300, 0);
    setTrackPosition(newPosition);
    controls.start({ x: newPosition });
  }, [trackPosition, controls]);

  const handleNext = useCallback(() => {
    const newPosition = Math.max(
      trackPosition - 300,
      -(trackWidth - (containerRef.current?.offsetWidth || 0))
    );
    setTrackPosition(newPosition);
    controls.start({ x: newPosition });
  }, [trackPosition, trackWidth, controls]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;

      if (Math.abs(velocity) >= 1000) {
        const direction = velocity < 0 ? -1 : 1;
        const newPosition = Math.max(
          Math.min(trackPosition + direction * 300, 0),
          -(trackWidth - (containerRef.current?.offsetWidth || 0))
        );
        setTrackPosition(newPosition);
        controls.start({ x: newPosition });
      } else {
        controls.start({ x: trackPosition });
      }

      setDragging(false);
    },
    [trackPosition, trackWidth, controls]
  );

  return (
    <Flex width='full' position='relative'>
      <IconButton
        aria-label='Previous'
        icon={<ChevronLeftIcon boxSize={6} />}
        onClick={handlePrev}
        position='absolute'
        left={-6}
        top='50%'
        transform='translateY(-50%)'
        zIndex={2}
        display={trackPosition === 0 ? "none" : "flex"}
        rounded='full'
        w='40px'
        h='40px'
        bg='white'
        boxShadow='0px 2px 4px rgba(0, 0, 0, 0.1)'
        _hover={{
          bg: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        _active={{
          bg: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />

      <Flex
        ref={containerRef}
        width='full'
        overflow='hidden'
        position='relative'
        px={4}
      >
        <motion.div
          ref={trackRef}
          drag='x'
          dragConstraints={{
            left: -(trackWidth - (containerRef.current?.offsetWidth || 0)),
            right: 0,
          }}
          style={{ x }}
          animate={controls}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <Flex gap={gap}>
            {children.map((child, index) => (
              <Box
                key={index}
                flex='0 0 auto'
                width={{ base: "85%", sm: "45%", md: "30%", lg: "23%" }}
                cursor={dragging ? "grabbing" : "grab"}
              >
                {child}
              </Box>
            ))}
          </Flex>
        </motion.div>
      </Flex>

      <IconButton
        aria-label='Next'
        icon={<ChevronRightIcon boxSize={6} />}
        onClick={handleNext}
        position='absolute'
        right={-6}
        top='50%'
        transform='translateY(-50%)'
        zIndex={2}
        display={
          trackPosition <=
          -(trackWidth - (containerRef.current?.offsetWidth || 0))
            ? "none"
            : "flex"
        }
        rounded='full'
        w='40px'
        h='40px'
        bg='white'
        boxShadow='0px 2px 4px rgba(0, 0, 0, 0.1)'
        _hover={{
          bg: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        _active={{
          bg: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
    </Flex>
  );
};

export default ChakraCarousel;
