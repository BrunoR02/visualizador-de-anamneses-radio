import AnamneseItem from "./AnamneseItem"
import {useContext, useEffect,useState} from "react"
import styles from "./AnamneseList.module.css"
import LoadingSpinner from "../LoadingSpinner"
import AuthContext from "../../stores/AuthContext"
import BasicButton from "../Buttons/BasicButton"

export default function AnamneseList(){
  const [list,setList] = useState([])
  const [pagination,setPagination] = useState(1)
  const [loading,setLoading] = useState(false)
  const {tokenId,isLogged} = useContext(AuthContext)

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const response = await fetch("/api/anamneses",{
          method:"POST",
          body: JSON.stringify({limit: pagination * 12,dentist:tokenId || sessionStorage.getItem("tokenId")}),
          headers: {
            "Content-Type":"application/json"
          }
        })
  
        if(!response.ok) throw Error("Erro ao fazer fetch dos Anamneses")
  
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
      {list.length>12 && <BasicButton title="Carregar mais" clickHandler={()=>setPagination(state=>state+1)}/>}
    </ul>
  )
}