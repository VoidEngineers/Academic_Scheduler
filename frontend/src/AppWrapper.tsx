import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

interface AppWrapperProps {
  children: ReactNode;
}

// Create a default theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes CSS across browsers */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AppWrapper;