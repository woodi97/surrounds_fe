import { SVGTypes } from '@src/components/atom/Icon/Icon';

export type NavRouterType = {
  path: string;
  name: string;
  icon: SVGTypes;
};

export const navRouter: NavRouterType[] = [
  {
    path: '/',
    name: 'Home',
    icon: 'house',
  },
  {
    path: '/community',
    name: 'Commu',
    icon: 'people',
  },
  {
    path: '/posts',
    name: 'write',
    icon: 'plusCircle',
  },
  {
    path: '/album',
    name: 'Album',
    icon: 'album',
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: 'profile',
  },
];
