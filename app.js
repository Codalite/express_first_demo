import express,{Router} from "express"
import route from "./users.js"
const app= express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.text())



app.use("/api",route)

app.get("/",(req,res)=>{
    return res.status(200).send({"data":"hello there coder"})
})

app.post("/",(req,res)=>{
    console.log(req.body);
    return res.status(201).send("created")
    
})
app.put("/:id",(req,res)=>{
    console.log(req.params.id);
    console.log(req.query.user);
    return res.status(201).send("created")
    
})
app.delete("/:id",(req,res)=>{
    console.log(req.body);
    return res.status(201).send("created")
    
})


app.listen(8080,(err)=>{
    console.log("app running on port 8080");
    
})