import { Link } from "react-router-dom"
import styles from "./Header.module.css"

export default function Header(){
  return (
    <div className={styles.background}>
      <header className={styles.header}>
        <Link to="/"><h2 className={styles.title}>Visualizador de Anamneses</h2></Link>
        <ul className={styles.nav}>
          <Link to="/login"><li className={styles.navItem}>Login</li></Link>
          <Link to="/cadastro"><li className={styles.navItem}>Cadastro</li></Link>
          <li className={styles.navItem}>Sair</li>
        </ul>
      </header>
    </div>
  )
}