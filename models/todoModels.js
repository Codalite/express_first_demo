import mongoose,{ Schema,Types,Model } from "mongoose";

const TodoSchema=new Schema({
    name:{type:String,required:true,unique:true},
    priority:{type:Boolean},
    completed:{type:Boolean},
    start_time:{type:Date,required:true},
    end_time:{type:Date,required:true},
    user_id:{type:Types.ObjectId,ref:"User",required:true},
},{ timestamps: true })

const Todo=mongoose.model("Todo",TodoSchema)
export default Todo
