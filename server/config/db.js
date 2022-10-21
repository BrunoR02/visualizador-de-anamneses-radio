const {createConnection} = require("mysql2/promise")
require('dotenv').config();

async function connect(){
  if(global.connection && global.connection.status !== "disconnected") return global.connection

  const connection = await createConnection(process.env.MYSQL_CONNECTION)
  console.log("Conexão com Banco de Dados realizada com sucesso!")
  global.connection = connection
  return connection
}

async function getAnamneses(){
  const conn = await connect()
  
  let anamneseData
  
  await conn.query("SELECT * FROM anm_anamnese")
  .then(response=>anamneseData=response[0])
  .catch(err=>console.log("Erro ao pegar dados dos Anamneses: " + err))

  return anamneseData
}

async function getSingleAnamnese(anamneseId){
  const conn = await connect()

  let anamneseData

  try{
    const anamnese = await conn.query("SELECT * FROM anm_anamnese_pergunta_resposta WHERE anamnese=?",[anamneseId])
    const anamneseDate = await conn.query("SELECT data FROM anm_anamnese WHERE id=?",[anamneseId])
    anamneseData = {
      date: anamneseDate[0][0].data,
      id: anamnese[0][0].anamnese,
      details: anamnese[0].map(item=>({pergunta:item.pergunta,resposta:item.resposta}))
    }
  } catch(err){
    console.log(err)
  }

  return anamneseData
}

async function getAnamneseDetails(){
  const conn = await connect()

  let anamneseData

  try{
    const questions = await conn.query("SELECT * FROM anm_pergunta")
    const answers = await conn.query("SELECT * FROM anm_resposta")
    anamneseData = {
      questions: questions[0],
      answers: answers[0]
    }
  } catch(err){
    console.log(err)
  }

  return anamneseData
}

async function login(user,password){
  const conn = await connect()

  const data = await conn.query("SELECT dentista FROM anm_anamnese WHERE LEFT(dentista,5)=?",[user])

  if(data[0].length === 0){
    return {id:null,error:true,message:"Usuário não encontrado!"}
  } else if(user!==password){
    return {id:null,error:true,message:"Senha incorreta! Tente novamente."}
  }

  return {id:data[0][0].dentista,error: false,message:"Logado com sucesso!"}
}

module.exports = {getAnamneses,getSingleAnamnese,getAnamneseDetails,login}