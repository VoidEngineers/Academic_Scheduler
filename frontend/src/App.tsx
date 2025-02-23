import {
  Box,
  Button,
  Center,
  Code,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { Logo } from '@/components/logo';
import { ColorModeButton } from '@/components/ui/color-mode';

function App() {
  return (
    <Center minH="dvh">
      <Box pos="absolute" top="4" right="4">
        <ColorModeButton />
      </Box>
      <VStack gap="5">
        <Logo height="12" mb="5" />
        <Heading size="4xl">Welcome to Chakra UI v3</Heading>
        <Text>Use this template to play around or report issues</Text>
        <HStack>
          <Tooltip
            showArrow
            content="This is the tooltip content"
            contentProps={{ css: { '--tooltip-bg': 'colors.red.500' } }}
          >
            <Button variant="outline" size="sm">
              Hover me
            </Button>
          </Tooltip>
        </HStack>
        <Code variant="surface">npm i @chakra-ui/react</Code>
      </VStack>
    </Center>
  );

import './App.css'
import AppWrapper from './AppWrapper'

function App() {

  return (
   <AppWrapper>
    <h1>Hello this is the global css</h1>
   </AppWrapper>
  )
}

export default App;
