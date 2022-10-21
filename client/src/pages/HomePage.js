import { useState } from "react";
import AnamneseList from "../components/Anamnese/AnamneseList";
import MainTitle from "../components/Contents/MainTitle";
import AnamnesesGraph from "../components/Graphs/AnamnesesGraph";
import Container from "../components/Layout/Container";

import styles from "./HomePage.module.css"

export default function HomePage(){
  const [anamneseData,setAnamneseData] = useState([])

  
  return (
    <Container extraClass={styles.container}>
      <AnamnesesGraph anamneseData={anamneseData}/>
      <MainTitle title="Lista de Anamneses"/>
      <AnamneseList setAnamneseData={setAnamneseData}/>
    </Container>
  )
}