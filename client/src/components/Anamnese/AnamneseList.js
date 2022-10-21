import AnamneseItem from "./AnamneseItem"
import {useContext, useEffect,useState} from "react"
import styles from "./AnamneseList.module.css"
import LoadingSpinner from "../LoadingSpinner"
import AuthContext from "../../stores/AuthContext"
import BasicButton from "../Buttons/BasicButton"

export default function AnamneseList({setAnamneseData}){
  const [anamneses,setAnamneses] = useState([])
  const [list,setList] = useState([])
  const [pagination,setPagination] = useState(1)
  const [loading,setLoading] = useState(false)
  const {tokenId} = useContext(AuthContext)

  useEffect(()=>{
    (async ()=>{
        try{
          setLoading(true)
          const response = await fetch("/api/anamneses")
    
          if(!response.ok) throw Error("Erro ao fazer fetch dos Anamneses")
    
          const data = await response.json()
  
          setAnamneses(data.anamneses)
          setAnamneseData(data.anamneses)
        } catch(error){
          console.log(error)
        }
        setLoading(false)
    })()
  },[setAnamneseData])

  useEffect(()=>{
    const displayList = anamneses.filter(anm=>anm.dentista===tokenId).slice(0,(12*pagination))
    if(displayList.length !== list.length){
      setList(displayList)
    }
  },[pagination,tokenId,list,anamneses])
  return (
    <ul className={styles.list}>
      {loading && <LoadingSpinner/>}
      {list.map(item=>{
        return <AnamneseItem key={item.id} id={item.id} date={item.data}/>
      })}
      {(list.length>12) && <BasicButton title="Carregar mais" clickHandler={()=>setPagination(state=>state+1)}/>}
    </ul>
  )
}