import styles from "./BackButton.module.css"

import backIcon from "../../assets/icons/back.png"
import { useNavigate } from "react-router-dom"

export default function BackButton(){
  const navigate = useNavigate()

  return (
    <button className={styles.button} onClick={()=>navigate("/")}><img src={backIcon} alt="back" width="25px"/></button>
  )
}