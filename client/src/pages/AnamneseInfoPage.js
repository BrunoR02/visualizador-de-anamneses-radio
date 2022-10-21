import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AnamneseDetails from "../components/Anamnese/AnamneseDetails"
import BackButton from "../components/Buttons/BackButton"
import MainTitle from "../components/Contents/MainTitle"
import Container from "../components/Layout/Container"
import LoadingSpinner from "../components/LoadingSpinner"

import styles from "./AnamneseInfoPage.module.css"

export default function AnamneseInfoPage(){
  const [anamnese,setAnamnese] = useState(null)
  const [loading,setLoading] = useState(false)
  const {anamneseId} = useParams()

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const response = await fetch(`/api/anamnese/${anamneseId}`)
  
        if(!response.ok) throw Error("Erro ao fazer fetch do Anamnese")
  
        const anamnese = await response.json()
  
        setAnamnese(anamnese)
        setLoading(false)
      } catch(error){
        console.log(error)
        setLoading(false)
      }
    })()
  },[anamneseId])

  return (
    <Container>
      {loading && <LoadingSpinner/>}
      {anamnese && (
        <>
          <BackButton/>
          <MainTitle title={`Anamnese nº${anamnese.id}`} extraClass={styles.title}/>
          <span className={styles.date}>{new Date(+anamnese.date * 1000).toLocaleDateString()}</span>
          <AnamneseDetails anamneseData={anamnese}/>
        </>
      )}
    </Container>
  )
}