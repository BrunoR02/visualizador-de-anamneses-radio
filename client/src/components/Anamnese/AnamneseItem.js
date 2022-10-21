import { useContext } from "react"
import { Link } from "react-router-dom"
import convertDateToLocale from "../../helpers/convertDateToLocale"
import AuthContext from "../../stores/AuthContext"
import styles from "./AnamneseItem.module.css"

export default function AnamneseItem({id,date}){
  const {keepActive} = useContext(AuthContext)

  const formatedDate = convertDateToLocale(new Date(+date * 1000).toISOString().slice(0,10))

  return (
    <Link to={`/anamnese/${id}`} onClick={keepActive} className={styles.item}>
      <li>
        <h4 className={styles.id}>{id}</h4>
        <span className={styles.date}>{formatedDate}</span>
      </li>
    </Link>
  )
}