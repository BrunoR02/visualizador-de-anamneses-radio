import { useContext, useState } from "react"
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { actions } from "../../stores/alert-store"
import AuthContext from "../../stores/AuthContext"
import BasicButton from "../Buttons/BasicButton"
import LoadingSpinner from "../LoadingSpinner"

import styles from "./LoginForm.module.css"

export default function LoginForm(){
  const [userInput,setUserInput] = useState("")
  const [passwordInput,setPasswordInput] = useState("")
  const [loading,setLoading] = useState(false)

  const {login} = useContext(AuthContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function submitHandler(e){
    e.preventDefault()
    setLoading(true)
    if(userInput.length!==0 && passwordInput!==0){
      const user = {
        user: userInput,
        password: passwordInput
      }
      const response = await fetch("/api/login",{
        method: "POST",
        body: JSON.stringify(user),
        headers:{
          "Content-Type": "application/json"
        }
      })

      const {id,error,message} = await response.json()

      if(error){
        dispatch(actions.createAlert({type:"error",message}))
      } else {
        login(id)
        dispatch(actions.createAlert({type:"success",message}))
        navigate("/")
      }
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <LoadingSpinner/>}
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.formControl}>
          <label className={styles.label}>
            Usuário
            <input className={styles.input} type="text" value={userInput} onChange={(e)=>setUserInput(e.target.value)}/>
          </label>
        </div>
        <div className={styles.formControl}>
          <label className={styles.label}>
            Senha
            <input className={styles.input} type="password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)}/>
          </label>
        </div>
        <BasicButton title="Logar"/>
      </form>
    </>
  )
}