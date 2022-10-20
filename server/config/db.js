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
  .then(response=>anamneseData=response)
  .catch(err=>console.log("Erro ao pegar dados dos Anamneses: " + err))

  return anamneseData[0]
}

async function getSingleAnamnese(anamneseId){
  const conn = await connect()

  let anamneseData

  await conn.query("SELECT * FROM anm_anamnese_pergunta_resposta WHERE anamnese=?",[anamneseId])
  .then(response=>anamneseData=response)
  .catch(err=>console.log("Erro ao pegar dados do Anamnese requerido: "+err))

  return anamneseData[0]
}

module.exports = {getAnamneses,getSingleAnamnese}