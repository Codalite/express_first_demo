// controllers/userController.js
import { User } from '../models/user.models.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req, res) => {
    // console.log(req.body)
    const data_body=req.body
    if (Array.isArray(data_body)) {
        console.log("is a list of objects");
        
        
    }else if(typeof req.body == "object" && req.bo){
 console.log("is a an objects");
    }
    else{
console.log("is empty");

    }
//   const body= req.body;
//   const { name, email } = body.length;
//   console.log(typeof body, body.length)
//   const user = new User({ name, email });
//   await user.save();
  res.status(201).send("user");
};