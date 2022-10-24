import { useContext, useEffect, useState } from "react";
import AnamneseList from "../components/Anamnese/AnamneseList";
import MainTitle from "../components/Contents/MainTitle";
import AnamnesesGraph from "../components/Graphs/AnamnesesGraph";
import Container from "../components/Layout/Container";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthContext from "../stores/AuthContext";

import styles from "./HomePage.module.css"

export default function HomePage(){
  const [anamneseData,setAnamneseData] = useState([])
  const [loading,setLoading] = useState(false)
  const {tokenId} = useContext(AuthContext)

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
  },[tokenId])
  
  return (
    <>
      {loading && <LoadingSpinner/>}
      {anamneseData.length!==0 && (
        <Container extraClass={styles.container}>
          <AnamnesesGraph anamneseData={anamneseData}/>
          <MainTitle title="Lista de Anamneses"/>
          <AnamneseList anamneses={anamneseData}/>
        </Container>
      )}
    </>
  )
}