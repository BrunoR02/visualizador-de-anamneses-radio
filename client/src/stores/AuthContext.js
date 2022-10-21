import { useCallback, createContext, useEffect, useState } from "react";

let expireTimeout

const AuthContext = createContext({
  tokenId: null,
  isLogged: false,
  autoLogout: false,
  delayLogin: false,
  login(id){},
  logout(){},
  resetAuto(){},
  keepActive(){},
})

function calculateRemainingTime(expirationTime){
  const expirationDate = new Date(+expirationTime).getTime()
  const actualDate = new Date().getTime()

  const duration = expirationDate - actualDate
  
  return duration
}

export function AuthContextProvider({children}){
  const [tokenId,setTokenId] = useState(null)
  const [delayLogin,setDelayLogin] = useState(false)
  const [autoLogout,setAutoLogout] = useState(false)

  const isLogged = !!tokenId

  function logout(){
    setTokenId(null)
    sessionStorage.removeItem("tokenId")
    sessionStorage.removeItem("expirationTime")
    setDelayLogin(true)

    setTimeout(()=>{
      setDelayLogin(false)
    },20000)

    clearTimeout(expireTimeout)
  }

  function login(id){
    setTokenId(id)
    const expirationTime = new Date(new Date().getTime()+300000).getTime()
    sessionStorage.setItem("tokenId",id)
    sessionStorage.setItem("expirationTime",expirationTime)

    const durationTime = calculateRemainingTime(expirationTime)
    expireTimeout = setTimeout(()=>{
      setAutoLogout(true)
      logout()
    },durationTime)
  }

  useEffect(()=>{
    setTokenId(sessionStorage.getItem("tokenId"))
    if(isLogged){
      const durationTime = calculateRemainingTime(sessionStorage.getItem("expirationTime"))
      if(durationTime < 10000){
        setAutoLogout(true)
        logout()
      } else {
        expireTimeout = setTimeout(()=>{
          setAutoLogout(true)
          logout()
        },durationTime)
      }
    }
  },[isLogged])

  const resetAuto = useCallback(()=>{
    setAutoLogout(false)
  },[])

  function keepActive(){
    if(tokenId){
      const expirationTime = new Date(new Date().getTime()+300000).getTime()
      const durationTime = calculateRemainingTime(expirationTime)
      sessionStorage.setItem("expirationTime",expirationTime)
      expireTimeout = setTimeout(()=>{
        setAutoLogout(true)
        logout()
      },durationTime)
    }
  }

  const context = {
    tokenId,
    isLogged,
    autoLogout,
    delayLogin,
    login,
    logout,
    resetAuto,
    keepActive
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext