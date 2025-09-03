
import Todo from "../models/todoModels.js";


export const createTodo = async (req, res) => {
    const { name, start_time, end_time } = req.body
    const start_date = new Date(start_time)
    const end_date = new Date(end_time)
    let todo = await Todo.create({ name: name, start_time: start_date, end_time: end_date, user_id: req.user._id })
    res.status(201).send(todo)
}

export const updateTodo = async (req, res) => {
    let id = req.params.id
    const { name, start_time, end_time } = req.body
    const start_date = new Date(start_time)
    const end_date = new Date(end_time)
    try {
        const todo = await Todo.findByIdAndUpdate(id, { name: name, start_time: start_date, end_time: end_date }, { new: true })
        if (!todo) {
            return res.status(404).send({ message: "Todo not found" })
        }
        else {
            return res.status(200).send(todo)
        }
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}




export const deleteTodo = async (req, res) => {
    let id = req.params.id

    const todo = await Todo.findByIdAndDelete(id)

    if (!todo) {
        return res.status(404).send({ message: "Todo not found" })
    }
    res.status(200).send({ message: "Todo deleted successfully" })

}

export const getTodos = async (req, res) => {
    const todos = await Todo.find({ user_id: req.user._id })
    res.status(200).send(todos)
}

export const getTodo = async (req, res) => {
    let id = req.params.id
    const todos = await Todo.find({ user_id: req.user._id, _id: id })
    res.status(200).send(todos)
}