import express from "express"
const app = express()

const PORT = process.env.PORT || 3001

app.get("/",(req,res)=>{
  res.send("Funcionando")
})

app.get("/api/anamneses",(req,res)=>{
  res.send("Anamneses")
})

app.listen(PORT,()=>{
  console.log("Servidor rodando em http://localhost:3001")
})