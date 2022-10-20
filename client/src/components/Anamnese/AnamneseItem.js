import styles from "./AnamneseItem.module.css"

export default function AnamneseItem({id,date}){

  const formatedDate = new Date(+date * 1000).toLocaleDateString()

  return (
    <li className={styles.item}>
      <h4 className={styles.id}>{id}</h4>
      <span className={styles.date}>{formatedDate}</span>
    </li>
  )
}