// controllers/userController.js
import bcrypt, { hash } from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
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
  const users = await User.find().select("-password");
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

 
  let users=await User.create([{name:name,email:email,phone:phone,password:passwordHash}])
  
 
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

 
  res.status(201).send({"user":users[0]});
  }catch(err){
    console.log(err);
    
   return res.status(400).send(err)
  }
  
};

export const updateUserPassword = async (req, res) => {
    
  const { id,password }= req.body;
  let new_id=null
  if (req.params.id){
    new_id=req.params.id
  }else{
    new_id=id
  }

  try{
    let passwordHash=await hashPassword(password)
    console.log(new_id);
    

  let user=await User.updateOne({_id:new_id}, {$set :{password:passwordHash}})
 
  return res.status(201).send({"user":user});
  }catch(err){
    console.log(err);
    
   return res.status(400).send(err)
  }
  
};


export const loginUser = async (req, res, next) => {

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};