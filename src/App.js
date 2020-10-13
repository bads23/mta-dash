import React, { useContext } from 'react'
import { UserContext } from './app/auth/context'
import Dashboard from './app/index'
import Login from './app/auth/login'

const App  = () => {

  const context = useContext(UserContext)

  const isLoggedIn = () =>{
    if (context.user.email){
      return true
    } else {
      return false
    }
  }

  return (
      <div id="wrapper">
        {
          isLoggedIn() ? (
            <>
              <Dashboard />
            </>
          ) : (
            <>
              <Login/>
            </>
          )
        }
      </div >
  )
}

export default App;