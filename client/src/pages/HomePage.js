import { useState } from "react";
import AnamneseList from "../components/Anamnese/AnamneseList";
import BasicButton from "../components/Buttons/BasicButton";
import MainTitle from "../components/Contents/MainTitle";
import Container from "../components/Layout/Container";

import styles from "./HomePage.module.css"

export default function HomePage(){


  return (
    <Container extraClass={styles.container}>
      <MainTitle title="Anamneses"/>
      <AnamneseList/>
    </Container>
  )
}