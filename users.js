import { Router } from "express"

const route=Router()

route.get("/user",function(req,res){
    res.send("from user route")
})


function get_user(req,res){
    return res.send(`from a specific user ${id}`)
}
route.get("/user/:id",get_user)


export default route