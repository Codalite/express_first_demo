import {Router} from "express";
import { protect } from './../middlewares/authMiddleware.js';
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todoControllers.js";
const todoRoute=Router()


todoRoute.post("/",protect,createTodo)
todoRoute.put("/:id",protect,updateTodo)
todoRoute.get("/",protect,getTodos)
todoRoute.get("/:id",protect,getTodo)
todoRoute.delete("/:id",protect,deleteTodo)

export default todoRoute