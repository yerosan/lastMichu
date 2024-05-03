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
import { useSelector, useDispatch } from 'react-redux';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';

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
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
];

const collectionItems= [
  getItem('Dashboard', 'dashboard', <DashboardOutlinedIcon/>, [
    getItem('collection', 'collection'),
  ]),
  {
    type:"divider"
  },
  getItem('Performance', 'performance', <SensorOccupiedIcon />, [
    getItem('collection', 'collectionPerformance'),
  ]),
  {
    type: 'divider',
  },
  // getItem('Income', 'income', <AttachMoneyIcon/>, [getItem('wabi', '13'), getItem('guyya', '14')]),
  // {
  //   type:"divider"
  // },
  getItem('Forms', 'form', <InputIcon />, [
    getItem('collection', 'collectionForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Setting', 'setting', <SettingOutlined/>, [getItem('Adduser', 'addUser')]),
  {
    type:"divider"
  },
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
]

const salseItems = [
  getItem('Dashboard', 'dashboard', <DashboardOutlinedIcon/>, [

    getItem('sales', 'sales')
  ]),
  {
    type:"divider"
  },
  getItem('Performance', 'performance', <SensorOccupiedIcon />, [
    getItem('sales', 'salesPerformance'),
  ]),
  {
    type: 'divider',
  },
  // getItem('Income', 'income', <AttachMoneyIcon/>, [getItem('wabi', '13'), getItem('guyya', '14')]),
  // {
  //   type:"divider"
  // },
  getItem('Forms', 'form', <InputIcon />, [
    getItem('sales', 'salesForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Setting', 'setting', <SettingOutlined/>, [getItem('Adduser', 'addUser')]),
  {
    type:"divider"
  },
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
]

const operationalSalseitems = [
  getItem('Dashboard', 'dashboard', <DashboardOutlinedIcon/>, [

    getItem('disbursement', 'disbursement', null), 
    getItem('sales', 'sales')
  ]),
  {
    type:"divider"
  },
  getItem('Performance', 'performance', <SensorOccupiedIcon />, [
    getItem('operational', 'operationalPerformance'),
    getItem('sales', 'salesPerformance'),
  ]),
  {
    type: 'divider',
  },
  // getItem('Income', 'income', <AttachMoneyIcon/>, [getItem('wabi', '13'), getItem('guyya', '14')]),
  // {
  //   type:"divider"
  // },
  getItem('Forms', 'form', <InputIcon />, [
    getItem('operational', 'operationalForm'),
    getItem('sales', 'salesForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Setting', 'setting', <SettingOutlined/>, [getItem('Adduser', 'addUser')]),
  {
    type:"divider"
  },
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
];

const collectionSalseitems = [
  getItem('Dashboard', 'dashboard', <DashboardOutlinedIcon/>, [
    getItem('collection', 'collection'),
    getItem('sales', 'sales')
  ]),
  {
    type:"divider"
  },
  getItem('Performance', 'performance', <SensorOccupiedIcon />, [
    getItem('collection', 'collectionPerformance'),
    getItem('sales', 'salesPerformance'),
  ]),
  {
    type: 'divider',
  },
  // getItem('Income', 'income', <AttachMoneyIcon/>, [getItem('wabi', '13'), getItem('guyya', '14')]),
  // {
  //   type:"divider"
  // },
  getItem('Forms', 'form', <InputIcon />, [
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
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
];

const operationalItems = [
  getItem('Dashboard', 'dashboard', <DashboardOutlinedIcon/>, [
    // getItem('collectionScreen', 'collectionScreen', null),
    getItem('disbursement', 'disbursement', null), 
  ]),
  {
    type:"divider"
  },
  getItem('Performance', 'performance', <SensorOccupiedIcon />, [
    getItem('operational', 'operationalPerformance'),
  ]),
  {
    type: 'divider',
  },
  // getItem('Income', 'income', <AttachMoneyIcon/>, [getItem('wabi', '13'), getItem('guyya', '14')]),
  // {
  //   type:"divider"
  // },
  getItem('Forms', 'form', <InputIcon />, [
    getItem('operational', 'operationalForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Setting', 'setting', <SettingOutlined/>, [getItem('Adduser', 'addUser')]),
  {
    type:"divider"
  },

  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
];

const screenItems = [
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
];
const salesUser=[
  getItem('Forms', 'form', <InputIcon />, [
    getItem('sales', 'salesForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
]

const operationalUser=[
  getItem('Forms', 'form', <InputIcon />, [
    getItem('operational', 'operationalForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
]

const collectionUser=[
  getItem('Forms', 'form', <InputIcon />, [
    getItem('collection', 'collectionForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
]
const operationalCollectionitems = [
  getItem('Dashboard', 'dashboard', <DashboardOutlinedIcon/>, [
    getItem('collection', 'collection', null),
    getItem('disbursement', 'disbursement', null), 
  ]),
  {
    type:"divider"
  },
  getItem('Performance', 'performance', <SensorOccupiedIcon />, [
    getItem('operational', 'operationalPerformance'),
    getItem('collection', 'collectionPerformance'),
  ]),
  {
    type: 'divider',
  },
  // getItem('Income', 'income', <AttachMoneyIcon/>, [getItem('wabi', '13'), getItem('guyya', '14')]),
  // {
  //   type:"divider"
  // },
  getItem('Forms', 'form', <InputIcon />, [
    getItem('operational', 'operationalForm'),
    getItem('collection', 'collectionForm'),
  ]),
  {
    type:"divider"
  },
  getItem('Setting', 'setting', <SettingOutlined/>, [getItem('Adduser', 'addUser')]),
  {
    type:"divider"
  },
  getItem('Screen', 'screen', <ScreenshotMonitorIcon/>, [
    getItem('collectionScreen', 'collectionScreen', null),
    getItem('operationalScreen', 'operationalScreen', null), 
    getItem('salesScreen', 'salesScreen', null), 
  ]),
  {
    type:"divider"
  },
];
const Menus = () => {
  const {navs, setNavs}=useStateContext()
  const {dashboard, setDashboard}=useStateContext()
  const {menu, setMenu}=useStateContext()
  const {userRoles, setUserRoles}=useStateContext()
  const userIn=useSelector(state=>state.logins)
  const navigate=useNavigate()

  let itemss =""
  if(userRoles.collectionAdmin && !userRoles.operationalAdmin && !userRoles.salesAdmin){
    itemss=collectionItems
  }else if(userRoles.salesAdmin && !userRoles.operationalAdmin && !userRoles.collectionAdmin){
    itemss=salseItems
  }else if(userRoles.operationalAdmin & !userRoles.collectionAdmin && !userRoles.salesAdmin){
    itemss=operationalItems
  }else if(userRoles.operationalAdmin && userRoles.collectionAdmin){
    itemss=operationalCollectionitems
  }else if(userRoles.salesAdmin && userRoles.operationalAdmin){
    itemss=operationalSalseitems
  }else if(userRoles.collectionAdmin && userRoles.salesAdmin){
    itemss=collectionSalseitems
  }else if (userRoles.admin){
    itemss=items
  }else if(userRoles.salesUser && (!userRoles.admin || !userRoles.collectionAdmin|| ! userRoles. operationalAdmin || userRoles.salesAdmin)){
    itemss=salesUser
  }else if(userRoles.collectionUser && (!userRoles.admin || !userRoles.collectionAdmin|| ! userRoles. operationalAdmin || userRoles.salesAdmin)){
    itemss=collectionUser
  }else if(userRoles.operationalUser && (!userRoles.admin || !userRoles.collectionAdmin|| ! userRoles. operationalAdmin || userRoles.salesAdmin)){
    itemss=operationalUser
  }
  else{
    itemss=screenItems
  }

  // screen/salesScreen
  // screen/collectionScreen
  const onClick = (e) => {
    if((e.keyPath[0]=="screen" && e.keyPath[1]=="dashboard") || 
    (e.keyPath[0]=="salesScreen" && e.keyPath[1]=="screen")  ||
    (e.keyPath[0]=="collectionScreen" && e.keyPath[1]=="screen")||
    (e.keyPath[0]=="operationalScreen" && e.keyPath[1]=="screen") ){
      setMenu(false)
      setDashboard(true)
    }
    setNavs(e.keyPath)
  };
  return (
    <div>
      <Menu
      onClick={onClick}
      style={{
        width:210,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={itemss}
    />
    </div>
    
   
  );
};
export default Menus;