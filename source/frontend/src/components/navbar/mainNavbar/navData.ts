import { NavItem } from './types';

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Courses',
   href:'/allcourses',
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