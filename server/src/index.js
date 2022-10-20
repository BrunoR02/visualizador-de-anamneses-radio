const express = require("express")
const cors = require("cors")
const { getAnamneses, getSingleAnamnese } = require("../config/db")
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

app.get("/",(req,res)=>{
  res.send("Funcionando")
})

app.post("/api/anamneses",async (req,res)=>{
  const {limit} = req.body
  
  const anamneses = await getAnamneses(limit)

  if(!anamneses) res.sendStatus(404)

  res.json({anamneses})
})

app.get("/api/anamnese/:anamneseId",async(req,res)=>{
  const {anamneseId} = req.params

  const anamnese = await getSingleAnamnese(anamneseId)

  if(!anamnese) res.sendStatus(404)

  res.json({anamnese})
})

app.listen(PORT,()=>{
  console.log("Servidor rodando em http://localhost:3001")
})