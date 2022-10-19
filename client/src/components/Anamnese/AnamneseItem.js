import styles from "./AnamneseItem.module.css"

export default function AnamneseItem({id,date}){
  return (
    <li className={styles.item}>
      <h4 className={styles.id}>{id}</h4>
      <span className={styles.date}>{date}</span>
    </li>
  )
}