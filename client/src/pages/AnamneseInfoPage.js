import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MainTitle from "../components/Contents/MainTitle"
import Container from "../components/Layout/Container"
import LoadingSpinner from "../components/LoadingSpinner"

export default function AnamneseInfoPage(){
  const [anamnese,setAnamnese] = useState([])
  const [loading,setLoading] = useState(false)
  const {anamneseId} = useParams()

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const response = await fetch(`/api/anamnese/${anamneseId}`)
  
        if(!response.ok) throw Error("Erro ao fazer fetch do Anamnese")
  
        const {anamnese} = await response.json()
  
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
      {anamnese.length!==0 && (
        <>
          <MainTitle title={`Anamnese nº${anamnese[0].anamnese}`}/>
        </>
      )}
    </Container>
  )
}