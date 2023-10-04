// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Worksheet',
    path: '/worksheet',
    icon: icon('pen-workspace'),
  },
  {
    title: 'Asset',
    path: '/iasset',
    icon: icon('pc-display'),
  },
];

const navConfig2 = [
  {
    title: 'Monitoring',
    path: '/monitoring',
    icon: icon('video-security-20-regular'), 
  },
  {
    title: 'Log Book TIK',
    path: '/logbook',
    icon: icon('book'),
  },
  {
    title: 'Topology',
    path: '/topology',
    icon: icon('network'),
  },
];

const navConfig5 = [
  {
    title: 'Reference',
    path: '/dashboard/app',
    icon: icon('security-group'),
  },
];

const navConfig4 = [
  {
    title: 'Panduan',
    path: '/dashboard/app',
    icon: icon('help-outline'),
  },
];

const navConfig3 = [
  {
    title: 'Home',
    path: '/app',
    icon: icon('home-bold-duotone'),
  },
];

export default navConfig;
export {navConfig2, navConfig3, navConfig4, navConfig5};
