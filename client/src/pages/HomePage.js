import { useState } from "react";
import AnamneseList from "../components/Anamnese/AnamneseList";

import styles from "./HomePage.module.css"

export default function HomePage(){
  const [pagination,setPagination] = useState(1)

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Anamneses</h3>
      <AnamneseList pagination={pagination}/>
      <button className={styles.button} onClick={()=>setPagination(state=>state+1)}>Carregar mais</button>
    </div>
  )
}