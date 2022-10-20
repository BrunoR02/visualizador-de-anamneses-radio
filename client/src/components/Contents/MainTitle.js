import styles from "./MainTitle.module.css"

export default function MainTitle({title}){
  return (
    <h3 className={styles.title}>{title}</h3>
  )
}