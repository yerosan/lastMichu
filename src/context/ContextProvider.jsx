import React from 'react'

import { createContext, useContext, useState } from 'react'

const ContextState=createContext()

// initialValue={

// }

const initialRoles={
  collectionAdmin:false,
  operationalAdmin:false,
  salesAdmin:false,
  collectionUser:false,
  operationalUser:false,
  salesUser:false,
  admin:false

}


export const ContextProvider = ({children}) => {
       const [menu, setMenu]=useState(true)
       const [navs, setNavs]=useState([])
       const [open, setOpen]=useState(false)
       const [login, setLogin]=useState(true)
       const [role, setRole]=useState(initialRoles)
  return (<ContextState.Provider
    value={
       {
        login, 
        setLogin,
        menu,
        setMenu,
        navs, 
        setNavs,
        open, 
        setOpen,
        role, 
        setRole
       }
    }
    >
    {children}
  </ContextState.Provider>
  )
}


export const useStateContext=()=>useContext(ContextState)

