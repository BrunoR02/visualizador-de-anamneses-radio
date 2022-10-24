import { useEffect, useState } from "react"
import LoadingSpinner from "../LoadingSpinner"
import styles from "./AnamneseDetails.module.css"

export default function AnamneseDetails({anamneseData}){
  const [questions,setQuestions] = useState([])
  const [answers,setAnswers] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const response = await fetch("/api/anamnese-details")
      
        if(!response.ok){
          throw Error("Erro ao carregar detalhes dos Anamneses")
        }
        const anamneseDetails = await response.json()

        setQuestions(anamneseDetails.questions)
        setAnswers(anamneseDetails.answers)
      } catch(error){
        console.log(error)
      }
      setLoading(false)
    })()
  },[])


  return (
    <>
      {loading && <LoadingSpinner/>}
      <ul className={styles.anamnese}>
        {!loading && questions!==0 && questions.map(question=>{
          const anamnese = anamneseData.details.find(item=>item.pergunta===question.id)
          const answer = anamnese && answers.find((answer)=>anamnese.resposta===answer.id)
          return (
            <li key={question.id} className={styles.item}>
              <h5 className={styles.question}>{question.descricao}</h5>
              <p className={styles.answer}>{anamnese && answer ? answer.descricao: ""}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}