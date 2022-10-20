import styles from "./BackButton.module.css"

import backIcon from "../../assets/icons/back.png"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../stores/AuthContext"

export default function BackButton(){
  const navigate = useNavigate()
  const {keepActive} = useContext(AuthContext)

  return (
    <button className={styles.button} onClick={()=>{navigate("/");keepActive()}}><img src={backIcon} alt="back" width="25px"/></button>
  )
}