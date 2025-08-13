import express,{Router} from "express"

const app= express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.text())


app.listen(8080,(err)=>{
    console.log("app running on port 8080");
    
})