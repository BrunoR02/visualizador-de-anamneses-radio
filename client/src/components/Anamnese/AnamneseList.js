import AnamneseItem from "./AnamneseItem"
import {useContext, useEffect,useState} from "react"
import styles from "./AnamneseList.module.css"
import AuthContext from "../../stores/AuthContext"
import BasicButton from "../Buttons/BasicButton"

export default function AnamneseList({anamneses}){
  const [list,setList] = useState([])
  const [pagination,setPagination] = useState(1)
  const {tokenId} = useContext(AuthContext)

  useEffect(()=>{
    const displayList = anamneses.filter(anm=>anm.dentista===tokenId).slice(0,(12*pagination))
    if(displayList.length !== list.length){
      setList(displayList)
    }
  },[pagination,tokenId,list,anamneses])
  
  return (
    <ul className={styles.list}>
      {list.map(item=>{
        return <AnamneseItem key={item.id} id={item.id} date={item.data}/>
      })}
      {(list.length>12*pagination) && <BasicButton title="Carregar mais" clickHandler={()=>setPagination(state=>state+1)}/>}
    </ul>
  )
}