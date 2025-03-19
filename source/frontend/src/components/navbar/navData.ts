import { NavItem } from './types';

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Courses',
    children: [
      {
        label: 'Computer Science',
        subLabel: 'Programming, data structures, algorithms',
        href: '/courses/computer-science',
      },
      {
        label: 'Mathematics',
        subLabel: 'Algebra, calculus, statistics',
        href: '/courses/mathematics',
      },
      {
        label: 'Physics',
        subLabel: 'Mechanics, electromagnetism, quantum',
        href: '/courses/physics',
      },
    ],
  },
  {
    label: 'Schedule',
    href: '/schedule',
  },
  {
    label: 'Calendar',
    href: '/calendar',
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Study Materials',
        subLabel: 'Access textbooks and study guides',
        href: '/resources/study-materials',
      },
      {
        label: 'Tools',
        subLabel: 'Calculators, converters, and more',
        href: '/resources/tools',
      },
    ],
  },
];