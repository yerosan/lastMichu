import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link,NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InputIcon from '@mui/icons-material/Input';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// <MailOutlined />
// [getItem('disbursement', 'disbursement'), getItem('disbursement', 'disbursement1')]
//  null, [getItem('collection', 'collection'), getItem('collection', '4collection')]
const items = [
  getItem('Dashboard', 'dashboard', <DashboardOutlinedIcon/>, [
    getItem('disbursement', 'disbursement', null), 
    getItem('collection', 'collection'),
    getItem('sales', 'sales')
  ]),
  {
    type:"divider"
  },
  getItem('Performance', 'performance', <SensorOccupiedIcon />, [
    getItem('operational', 'operationalPerformance'),
    getItem('collection', 'collectionPerformance'),
    getItem('sales', 'salesPerformance'),
  ]),
  {
    type: 'divider',
  },
  getItem('Income', 'income', <AttachMoneyIcon/>, [getItem('wabi', '13'), getItem('guyya', '14')]),
  {
    type:"divider"
  },
  getItem('Forms', 'form', <InputIcon />, [
    getItem('operational', 'operationalForm'),
    getItem('collection', 'collectionForm'),
    getItem('sales', 'salesForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Setting', 'setting', <SettingOutlined/>, [getItem('Adduser', 'addUser')]),
  {
    type:"divider"
  },
];
const Menus = () => {
  const {navs, setNavs}=useStateContext()
  const navigate=useNavigate()
  const onClick = (e) => {
    console.log('click ', e);
    console.log("this is key path", e.keyPath)
    console.log("this is a lock", navs)
    // console.log("this is NavChange************", e, navs)
    setNavs(e.keyPath)
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width:210,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
   
  );
};
export default Menus;