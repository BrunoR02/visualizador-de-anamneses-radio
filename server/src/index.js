const express = require("express")
const cors = require("cors")
const { getAnamneses, getSingleAnamnese, getAnamneseDetails, login } = require("../config/db")
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

app.get("/",(req,res)=>{
  res.send("Funcionando")
})

app.get("/api/anamneses",async (req,res)=>{  
  const anamneses = await getAnamneses()

  if(!anamneses) res.sendStatus(404)

  res.json({anamneses})
})

app.post("/api/anamnese/:anamneseId",async(req,res)=>{
  const {anamneseId} = req.params
  const {dentistId} = req.body

  const anamnese = await getSingleAnamnese(anamneseId,dentistId)

  res.json(anamnese)
})

app.get("/api/anamnese-details",async (req,res)=>{
  const anamneseDetails = await getAnamneseDetails()

  if(!anamneseDetails) res.sendStatus(404)

  res.json({...anamneseDetails})
})

app.post("/api/login",async (req,res)=>{
  const {user,password} = req.body
  const response = await login(user,password)

  res.json(response)
})

app.listen(PORT,()=>{
  console.log("Servidor rodando em http://localhost:3001")
})