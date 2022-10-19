import AnamneseList from "../components/Anamnese/AnamneseList";

import styles from "./HomePage.module.css"

export default function HomePage(){
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Anamneses</h3>
      <AnamneseList/>
    </div>
  )
}