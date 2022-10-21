import styles from "./MainTitle.module.css"

export default function MainTitle({title,extraClass}){
  return (
    <h3 className={styles.title + " " + extraClass}>{title}</h3>
  )
}