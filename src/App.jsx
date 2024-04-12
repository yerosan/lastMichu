import React from 'react'
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
  console.log("the menu app is here", menu,navs)
  {/* <Navigate to="/michus"></Navigate> */}
        
  return (
    // <div></div>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <Router> */}
        {login ? <div className='relative flex justify-center items-center w-full h-screen bg-slate-200'>
          <Navigate to="/michu/login" ></Navigate>
          <LogIn/>
        </div>:
        <div className="flex relative h-full w-full bg-slate-200">
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
          <div className={`${menu?"w-5/6 bg-slate-50 min-h-screen" :"w-full" }`}>
            <Navbar/>
            <div className='mt-16 px-4'>
              <Routes>
                <Route path='/michu/login' element={<LogIn/>}/>
                <Route path='michu/dashboard/disbursement' element={<Disbursement/>}/>
                <Route path='michu/dashboard' element={<Disbursement/>}/>
                <Route path='michu/dashboard/sales' element={<Disbursement/>}/>
                <Route path='michu/dashboard/collection' element={<Collection/>}/>
                <Route path='/michu/performance/operationalPerformance' element={<CoreData/>}/>
                <Route path="/michu/performance/collectionPerformance" element={<CollectionPerformance/>}/>
                <Route path="/michu/performance/salesPerformance" element={<DataGridDemo/>}/>
                <Route path='/michu/form/operationalForm' element={<OperationalTab/>}/>
                <Route path='/michu/form/collectionForm' element={<CollectionTab/>}/>
                <Route path='/michu/form/salesForm' element={<CollectionTab/>}/>
                <Route path="michu/setting/addUser" element={<CreateUser/>}></Route>
              </Routes>
            </div>
          </div>
        </div>
}
      </ThemeProvider>
      {/* </Router> */}
    </BrowserRouter>
  )
}

export default App
