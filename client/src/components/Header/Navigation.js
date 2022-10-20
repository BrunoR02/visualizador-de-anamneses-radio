import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actions } from "../../stores/alert-store";
import AuthContext from "../../stores/AuthContext";

import styles from "./Navigation.module.css"

export default function Navigation(){
  const {isLogged,logout,autoLogout} = useContext(AuthContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(autoLogout){
      logout()
      dispatch(actions.createAlert({type: "warning",message: "Você foi deslogado por inatividade! Faça o login novamente para continuar."}))
      navigate("/login")
    }
  },[autoLogout,dispatch,logout,navigate])

  function logoutHandler(){
    logout()
    dispatch(actions.createAlert({type:"success",message:"Você foi deslogado com sucesso!"}))
    navigate("/login")
  }

  return (
    <ul className={styles.nav}>
      {!isLogged && <Link to="/login"><li className={styles.navItem}>Login</li></Link>}
      {isLogged && <li className={styles.navItem} onClick={logoutHandler}>Deslogar</li>}
    </ul>
  )
}