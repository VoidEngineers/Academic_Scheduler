import { useState } from 'react';

export const useSidebarLogic = () => {
  const [open, setOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLecturersOpen, setIsLecturersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return {
    open,
    setOpen,
    isDashboardOpen,
    setIsDashboardOpen,
    isUsersOpen,
    setIsUsersOpen,
    isCoursesOpen,
    setIsCoursesOpen,
    isLecturersOpen,
    setIsLecturersOpen,
    isSettingsOpen,
    setIsSettingsOpen,
  };
};