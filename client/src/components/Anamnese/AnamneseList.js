import AnamneseItem from "./AnamneseItem"
import styles from "./AnamneseList.module.css"

export default function AnamneseList(){
  return (
    <ul className={styles.list}>
      <AnamneseItem id={1} date={"12/02/2017"}/>
      <AnamneseItem id={2} date={"12/07/2020"}/>
      <AnamneseItem id={3} date={"11/06/2018"}/>
      <AnamneseItem id={1} date={"12/02/2017"}/>
      <AnamneseItem id={2} date={"12/07/2020"}/>
      <AnamneseItem id={3} date={"11/06/2018"}/>
      <button className={styles.button}>Carregar mais</button>
    </ul>
  )
}