// models/User.js
import mongoose, {Schema}from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password:{type:String,min:4,max:6,required:true},
},{ timestamps: true } // Enable timestamps
);



export const User = mongoose.model('User', userSchema);