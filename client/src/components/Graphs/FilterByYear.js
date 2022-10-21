import { useEffect, useState } from "react"

import styles from "./FilterByYear.module.css"

export default function FilterByYear({years,setGraphYear}){
  const [activeYear,setActiveYear] = useState("2015")
  const [previousActive,setPreviousActive] = useState(null)

  useEffect(()=>{
    if(previousActive !== activeYear){
      setGraphYear(activeYear)
      setPreviousActive(activeYear)
    }
  },[previousActive,setGraphYear,activeYear])

  return (
    <select className={styles.select} value={activeYear} onChange={(e)=>{setActiveYear(e.target.value)}}>
      {years.map(year=>{
        return <option key={year} value={year}>{year}</option>
      })}
    </select>
  )
}