const {createConnection} = require("mysql2/promise")

async function connect(){
  if(global.connection && global.connection.status !== "disconnected") return global.connection

  const connection = await createConnection("mysql://rmteste8:H6xUsnEU@rmteste.cp3xapebzks5.us-east-1.rds.amazonaws.com:3306/anamnese")
  console.log("Conexão com Banco de Dados realizada com sucesso!")
  global.connection = connection
  return connection
}

async function getAnamneses(limit){
  const conn = await connect()
  
  let anamneseData
  
  await conn.query("SELECT * FROM anm_anamnese LIMIT 0,?",[limit])
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

module.exports = {getAnamneses,getSingleAnamnese,getAnamneseDetails}