import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import AnamneseDetails from "../components/Anamnese/AnamneseDetails"
import BackButton from "../components/Buttons/BackButton"
import MainTitle from "../components/Contents/MainTitle"
import Container from "../components/Layout/Container"
import LoadingSpinner from "../components/LoadingSpinner"
import convertDateToLocale from "../helpers/convertDateToLocale"
import { actions } from "../stores/alert-store"
import AuthContext from "../stores/AuthContext"

import styles from "./AnamneseInfoPage.module.css"

export default function AnamneseInfoPage(){
  const [anamnese,setAnamnese] = useState(null)
  const [loading,setLoading] = useState(false)

  const {tokenId} = useContext(AuthContext)

  const navigate = useNavigate()
  const {anamneseId} = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(tokenId){
      (async ()=>{
        try{
          setLoading(true)
          const response = await fetch(`/api/anamnese/${anamneseId}`,{
            method: "POST",
            body: JSON.stringify({dentistId:tokenId}),
            headers: {
              "Content-Type": "application/json"
            }
          })
    
          const anamnese = await response.json()
    
          if(anamnese.error){
            navigate("/")
            dispatch(actions.createAlert({type:"error",message:anamnese.message}))
          } else {
            setAnamnese(anamnese)
          }
        } catch(error){
          console.log(error)
        }
        
        setLoading(false)
      })()
    }
  },[anamneseId,navigate,dispatch,tokenId])

  return (
    <Container>
      {loading && <LoadingSpinner/>}
      {anamnese && (
        <>
          <BackButton/>
          <MainTitle title={`Anamnese nº${anamnese.id}`} extraClass={styles.title}/>
          <span className={styles.date}>{convertDateToLocale(new Date(+anamnese.date * 1000).toISOString().slice(0,10))}</span>
          <AnamneseDetails anamneseData={anamnese}/>
        </>
      )}
    </Container>
  )
}