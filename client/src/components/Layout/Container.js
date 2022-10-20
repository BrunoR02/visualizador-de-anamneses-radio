import styles from "./Container.module.css"

export default function Container({children,extraClass}){
  return (
    <div className={styles.container + " " + extraClass}>
      {children}
    </div>
  )
}