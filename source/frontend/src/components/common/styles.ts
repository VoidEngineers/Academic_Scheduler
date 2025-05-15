import { Box, Flex, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const CarouselContainer = styled(Flex)`
  width: 100%;
  position: relative;
`;

export const CarouselTrackContainer = styled(Flex)`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const CarouselTrack = styled(motion.div)`
  display: flex;
`;

export const CarouselItemContainer = styled(Box)<{ isDragging: boolean }>`
  flex: 0 0 auto;
  width: 85%;
  cursor: ${props => props.isDragging ? "grabbing" : "grab"};
  
  @media (min-width: 480px) {
    width: 45%;
  }
  
  @media (min-width: 768px) {
    width: 30%;
  }
  
  @media (min-width: 992px) {
    width: 23%;
  }
`;

export const CarouselButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const PrevButton = styled(CarouselButton)`
  left: -6px;
`;

export const NextButton = styled(CarouselButton)`
  right: -6px;
`;