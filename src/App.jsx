import React, { useEffect } from 'react'
import { NavLink, Link , Navigate} from 'react-router-dom'

import { useStateContext } from './context/ContextProvider'
import Sidebar from './componetns/Sidebar'
import Navbar from './componetns/Navbar'
import Mainds from './componetns/Mainds'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Disbursement from './componetns/Disbursement'
import Individual from './componetns/Individual'
import ScrolableTable from './componetns/ScrolableTable'
// import DataTable from './componetns/Table'
// import CustomizedTables from './componetns/TheamePlate'
import CoreData from './componetns/CoreData'
import EditableTable from './componetns/EditableTable'
import RegisterForm from './componetns/Form'
import FormTab from './componetns/FormTab'
import LogIn from './componetns/Login'
import CollectionFrom from './componetns/CollectionFrom'

import { createTheme,ThemeProvider } from '@mui/material';
import { cyan, purple } from '@mui/material/colors';
import CollectionFromExist from './componetns/ExistForm'
import CollectionTab from './componetns/CollectionTab'
import CreateUser from './componetns/CreateUser'
import OperationalTab from './componetns/OperationalTab'
import CollectionPerformance from './componetns/CollectionPerformance'
import DataGridDemo from './componetns/DataGrid'
import Collection from './componetns/Collection'
import DateRange from './componetns/Colletion/DateRange'
import User from './componetns/User'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { michu } from './assets'
import LoginPage from './componetns/LoginPage'
import ChangePassword from './componetns/ChangePassword'
// import DateRange from './componetns/Colletion/DateRange'
const theme = createTheme({
  palette: {
    primary: {
      main: "#00adef",
    },
    secondary: {
      main: "#e38524"

    },
  },
});


const App = () => {
  const {menu, setMenu}=useStateContext()
  const {navs, setNavs}=useStateContext()
  const {login, setLogin}=useStateContext()
  const {userRoles,setUserRoles}=useStateContext()
  const user=useSelector(state=>state.user)
  const userRole=async()=>{
    
  }
  useEffect(()=>{
    if(user.data){
    userRole()
    }
  },[login])
  {/* <Navigate to="/michus"></Navigate> */}
        
  return (
    // <div></div>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <Router> */}
        {login ? <LoginPage/>:
        <div>
        {userRoles ? 
        <div className="flex relative h-full w-full bg-slate-200">
          {userRoles.collectionUser ? 
          <div className="flex h-screen w-full bg-slate-200">
            <Navigate to= "/michu/form/collectionForm"></Navigate>
            <Navbar/>
            <div className='mt-14 w-full items-center px-6'>
               <CollectionTab/>
            </div>
          </div>: 
        <div className=' flex relative h-full w-full bg-slate-200' >
          {navs.length==0 ? 
          <Navigate to= "michu/dashboard"></Navigate>
          :<Navigate to= {`michu/${navs[1]}/${navs[0]}`}></Navigate>          
          }
          {menu ?
            <div className='w-52 h-screen'>
              <Sidebar/> 
            </div>
            : 
            <div className='w-0'>
              <Sidebar/>
            </div>
          } 
          <div className={`${menu?"w-5/6 bg-slate-50 min-h-screen" :"min-h-screen w-full bg-slate-50" }`}>
            <Navbar/>
            <div className='mt-16 px-4 w-full max-h-screen '>
              <Routes>
                <Route path='/michu/login' element={<LoginPage/>}/>
                <Route path='michu/dashboard/disbursement' element={<Collection/>}/>
                <Route path='michu/dashboard' element={<Collection/>}/>
                <Route path='michu/dashboard/sales' element={<Collection/>}/>
                <Route path='michu/dashboard/collection' element={<Collection/>}/>
                <Route path='/michu/performance/operationalPerformance' element={<CollectionPerformance/>}/>
                <Route path="/michu/performance/collectionPerformance" element={<CollectionPerformance/>}/>
                <Route path="/michu/performance/salesPerformance" element={<CollectionPerformance/>}/>
                <Route path='/michu/form/operationalForm' element={<CollectionTab/>}/>
                <Route path='/michu/form/collectionForm' element={<CollectionTab/>}/>
                <Route path='/michu/form/salesForm' element={<CollectionTab/>}/>
                <Route path="michu/setting/addUser" element={<User/>}></Route>
                <Route path='michu/user/changePassword' element={<ChangePassword/>}/>
              </Routes>
            </div>
          </div>
          </div>}
        </div> :
        <div className='relative flex justify-center items-center w-full h-screen bg-slate-50'>
           <Navigate to="/michu/login" ></Navigate>
           <LogIn/>
        </div>
        }
        </div>}
      </ThemeProvider>
      {/* </Router> */}
    </BrowserRouter>
  )
}

export default App
