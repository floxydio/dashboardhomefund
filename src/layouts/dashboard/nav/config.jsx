// component
import SvgColor from '../../../components/svg-color';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Settings } from '@mui/icons-material';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'slider',
    path: '/dashboard/slider',
    icon: <NewspaperIcon />,
  },
  {
    title: 'bussiness',
    path: '/dashboard/business',
    icon: icon('ic_lock'),
  },
  {
    title: 'Virtual Account',
    path: '/dashboard/virtual-account',
    icon: <AccountBalanceWalletIcon color="black" />,
  },
  {
    title: 'Setting Account',
    path: '/dashboard/setting-account',
    icon: <Settings color="black" />,
  },
  // {
  //   title: 'Transaction',
  //   path: '/dashboard/transaction',
  //   icon: <ReceiptIcon color="black" />,
  // },
];

export default navConfig;
