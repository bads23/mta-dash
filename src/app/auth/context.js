import React, { createContext, useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'

export const UserContext = createContext()

const UserProvider = (props) => {
  var UserExists = localStorage.getItem("user")

  const TokenValid = () => {
    if(localStorage.getItem("tokens")){
      var tokens = JSON.parse(localStorage.getItem("tokens"))
      try {
        jwt.verify(tokens.access, 'cbwx-i+4-)0&4sk2sa#thh5atz4-%3bu(9=i5l*r_st17nh0b-')
        return true
      } catch (err){
        console.log(err)
        localStorage.removeItem("user")
        localStorage.removeItem("tokens")
      }
    } else {
      return false
    }
  } 

  if (UserExists && TokenValid()) {
    var userInfo = JSON.parse(UserExists)
  } else {
    userInfo = {}
  }
  const [user, setUser] = useState(userInfo)

  useEffect(() => {
    setUser(userInfo)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider