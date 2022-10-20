import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Alert from "../Helpers/Alert"
import styles from "./Header.module.css"
import Navigation from "./Navigation"

export default function Header(){
  const alertOn = useSelector(state=>state.alertOn)

  return (
    <div className={styles.background}>
      {alertOn && <Alert/>}
      <header className={styles.header}>
        <Link to="/"><h2 className={styles.title}>Visualizador de Anamneses</h2></Link>
        <Navigation/>
      </header>
    </div>
  )
}