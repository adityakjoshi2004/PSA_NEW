// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'buy-dat1',
      title:'Buy Data',
      type: 'item',
      url:'/buy-data',
      icon: icons.TableOutlined
    },
    {
      id:'sell-data1',
      title:'Sell Data',
      type: 'item',
      url: '/sell-data',
      icon: icons.TableOutlined
    }

  ]
};

export default pages;
