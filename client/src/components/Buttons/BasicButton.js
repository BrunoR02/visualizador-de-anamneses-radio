import styles from "./BasicButton.module.css"

export default function BasicButton({title,onClick}){
  return (
    <button className={styles.button} onClick={onClick}>{title}</button>
  )
}