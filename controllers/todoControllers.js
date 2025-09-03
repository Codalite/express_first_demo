
import Todo from "../models/todoModels.js";


export const createTodo =async(req,res)=>{
    const {name,start_time,end_time} =req.body
    const start_date=new Date(start_time)
    const end_date=new Date(end_time)

    // console.log(start_date);
    // console.log(Date(start_time));
    let todo=await Todo.create({name:name,start_time:start_date,end_time:end_date,user_id:req.user._id})
    res.status(201).send(todo)
    
}
export const updateTodo =(req,res)=>{

}
export const deleteTodo =(req,res)=>{

}
export const getTodos = async(req,res)=>{
    const todos=await Todo.find({user_id:req.user._id})
    res.status(200).send(todos)
}
export const getTodo =async(req,res)=>{
    let id=req.params.id
    const todos=await Todo.find({user_id:req.user._id,_id:id})
    res.status(200).send(todos)
}