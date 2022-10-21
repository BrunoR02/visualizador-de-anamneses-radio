import { useEffect, useState } from "react";
import AnamneseList from "../components/Anamnese/AnamneseList";
import MainTitle from "../components/Contents/MainTitle";
import AnamnesesGraph from "../components/Graphs/AnamnesesGraph";
import Container from "../components/Layout/Container";
import LoadingSpinner from "../components/LoadingSpinner";

import styles from "./HomePage.module.css"

export default function HomePage(){
  const [anamneseData,setAnamneseData] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    (async ()=>{
        try{
          setLoading(true)
          const response = await fetch("/api/anamneses")
    
          if(!response.ok) throw Error("Erro ao fazer fetch dos Anamneses")
    
          const data = await response.json()

          setAnamneseData(data.anamneses)
        } catch(error){
          console.log(error)
        }
        setLoading(false)
    })()
  },[])
  
  return (
    <>
      {loading && <LoadingSpinner/>}
      <Container extraClass={styles.container}>
        <AnamnesesGraph anamneseData={anamneseData}/>
        <MainTitle title="Lista de Anamneses"/>
        <AnamneseList anamneses={anamneseData}/>
      </Container>
    </>
  )
}