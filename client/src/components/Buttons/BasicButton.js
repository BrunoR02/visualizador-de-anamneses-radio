import { useContext } from "react"
import AuthContext from "../../stores/AuthContext"
import styles from "./BasicButton.module.css"

export default function BasicButton({title,clickHandler}){
  const {keepActive} = useContext(AuthContext)

  return (
    <button className={styles.button} onClick={()=>{if(clickHandler) clickHandler();keepActive()}}>{title}</button>
  )
}