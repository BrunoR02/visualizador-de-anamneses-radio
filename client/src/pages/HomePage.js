import { useState } from "react";
import AnamneseList from "../components/Anamnese/AnamneseList";
import BasicButton from "../components/Buttons/BasicButton";
import MainTitle from "../components/Contents/MainTitle";
import Container from "../components/Layout/Container";

import styles from "./HomePage.module.css"

export default function HomePage(){
  const [pagination,setPagination] = useState(1)

  return (
    <Container extraClass={styles.container}>
      <MainTitle title="Anamneses"/>
      <AnamneseList pagination={pagination}/>
      <BasicButton title="Carregar mais" clickHandler={()=>setPagination(state=>state+1)}/>
    </Container>
  )
}