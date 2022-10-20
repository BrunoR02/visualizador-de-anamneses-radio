import AnamneseItem from "./AnamneseItem"
import {useEffect,useState} from "react"
import styles from "./AnamneseList.module.css"
import LoadingSpinner from "../LoadingSpinner"

export default function AnamneseList({pagination}){
  const [list,setList] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const response = await fetch("/api/anamneses",{
          method:"POST",
          body: JSON.stringify({limit: pagination * 12}),
          headers: {
            "Content-Type":"application/json"
          }
        })
  
        if(!response.ok) throw Error("Erro ao fazer fetch das Anamneses")
  
        const {anamneses} = await response.json()

        setList(anamneses)
        setLoading(false)
      } catch(error){
        console.log(error)
        setLoading(false)
      }
    })()
  },[pagination])

  return (
    <ul className={styles.list}>
      {loading && <LoadingSpinner/>}
      {list.map(item=>{
        return <AnamneseItem key={item.id} id={item.id} date={item.data}/>
      })}
    </ul>
  )
}