import { Line } from "react-chartjs-2"
// eslint-disable-next-line
import Chart from "chart.js/auto"; 

import styles from "./AnamnesesGraph.module.css"
import MainTitle from "../Contents/MainTitle";
import convertDataForGraph from "../../helpers/convertDataForGraph";
import getYearsFromData from "../../helpers/getYearsFromData";
import FilterByYear from "./FilterByYear";
import { useState } from "react";

export default function AnamnesesGraph({anamneseData}){
  const [graphYear,setGraphYear] = useState("2015")

  console.log(getYearsFromData(anamneseData))

  const labels = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
  const datasets = [{
    label: "Anamneses",
    data: convertDataForGraph(anamneseData,graphYear),
    fill: false,
    borderColor: "#155680"
  }]

  return (
    <>
      <MainTitle title="Anamneses Realizados Mensalmente"/>
      <FilterByYear years={getYearsFromData(anamneseData)} setGraphYear={setGraphYear}/>
      <div className={styles.container}>
        <Line data={{
          labels,
          datasets
        }}
        options={{maintainAspectRatio:false,scales:{y:{
          suggestedMin:0,
        }}}}
        />
      </div>
    </>
  )
}