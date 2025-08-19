// controllers/userController.js
import bcrypt, { hash } from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/userModels.js';

dotenv.config();

async function  hashPassword(password){
  const salt_value=process.env.SALT

  const salt= await bcrypt.genSalt(parseInt(salt_value))

  const hashed_password=  await bcrypt.hash(password,salt)
  return hashed_password
}


export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUser = async (req, res) => {
  console.log(req.params.id);
  
  const user = await User.findOne({name:req.params.id});
  res.json(user);
};
export const deleteUser = async (req, res) => {
 
  
  const user = await User.deleteOne({_id:req.params.id});
  res.json(user);
};



export const createUser = async (req, res) => {
    
  const { name, email,phone,password }= req.body;
  try{
let passwordHash=await hashPassword(password)

  // console.log(await bcrypt.compare(password,passwordHash));
  let users=await User.create([{name:name,email:email,phone:phone,password:passwordHash}])
  // let user=await User({name:name,email:email,phone:phone,password:passwordHash})
  // user_obj=await user.save()
 
  res.status(201).send({"user":users[0]});
  }catch(err){
    console.log(err);
    
   return res.status(400).send(err)
  }
  
};

export const updateUser = async (req, res) => {
    
  const { name, email,phone }= req.body;
  try{


  let users=await User.updateOne({_id:req.params.id}, {$set :{name:name,email:email,phone:phone}})
  // let user=await User({name:name,email:email,phone:phone,password:passwordHash})
  // user_obj=await user.save()
 
  res.status(201).send({"user":users[0]});
  }catch(err){
    console.log(err);
    
   return res.status(400).send(err)
  }
  
};

export const updateUserPassword = async (req, res) => {
    
  const { id,password }= req.body;
  try{
    let passwordHash=await hashPassword(password)

  let user=await User.updateOne({_id:id}, {$set :{password:passwordHash}})
 
  return res.status(201).send({"user":user});
  }catch(err){
    console.log(err);
    
   return res.status(400).send(err)
  }
  
};