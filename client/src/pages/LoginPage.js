import MainTitle from "../components/Contents/MainTitle";
import LoginForm from "../components/Forms/LoginForm";

import styles from "./LoginPage.module.css"

export default function LoginPage(){
  return (
    <div className={styles.container}>
      <MainTitle title="Realizar o Login"/>
      <LoginForm/>
    </div>
  )
}