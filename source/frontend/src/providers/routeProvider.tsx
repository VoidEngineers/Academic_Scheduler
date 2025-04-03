import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Flex, Spinner, Text } from "@chakra-ui/react";
import routes from '../routes/routes';
import AdminNav from '../pages/Admin/AdminNav';

// Loading component using Chakra UI
const LoadingFallback = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="80vh"
    flexDirection="column"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="rgba(0, 0, 0, 0.1)"
      color="#4FD1C5"
      size="xl"
      mb={4}
    />
    <Text color="gray.600" fontSize="md" fontWeight="medium">
      Loading...
    </Text>
  </Flex>
);

interface RouteProviderProps {
  isDrawerOpen: boolean;
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
}

const RouteProvider: React.FC<RouteProviderProps> = ({
  isDrawerOpen,
  handleOpenSidebar,
  handleCloseSidebar
}) => {
  // Admin Nav props
  const adminNavProps = {
    isOpen: isDrawerOpen,
    onOpen: handleOpenSidebar,
    onClose: handleCloseSidebar,
    drawerBg: "#f9f9f9",
    menuActiveBg: "#e2e8f0",
    menuHoverBg: "#edf2f7",
    cardBg: "#ffffff",
    headerBorderColor: "#4FD1C5"
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes.map((route, index) => {
          const { element, path, needsAdminNav } = route;
          
          // If this route needs AdminNav, wrap the element with it
          const routeElement = needsAdminNav ? (
            <>
              <AdminNav {...adminNavProps} />
              {element}
            </>
          ) : element;
          
          return <Route key={index} path={path} element={routeElement} />;
        })}
      </Routes>
    </Suspense>
  );
};

export default RouteProvider;