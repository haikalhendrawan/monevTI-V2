// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Worksheet',
    path: '/worksheet',
    icon: icon('solar-document'),
  },
  {
    title: 'Data TIK',
    path: '/iasset',
    icon: icon('solar-database-bold'),
  },
];

const navConfig2 = [
  {
    title: 'Monitoring',
    path: '/monitoring',
    icon: icon('solar-telescope'), 
  },
  {
    title: 'Log Book TIK',
    path: '/logbook',
    icon: icon('solar-notebook'),
  },
  {
    title: 'Topology',
    path: '/topology',
    icon: icon('solar-usb'),
  },
];

const navConfig5 = [
  {
    title: 'Reference',
    path: '/dashboard/app',
    icon: icon('solar-user-check'),
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
