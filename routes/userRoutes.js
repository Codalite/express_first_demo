// routes/userRoutes.js
import express from 'express';
import { getUsers, createUser,getUser,deleteUser,updateUser,updateUserPassword } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.patch('/', updateUserPassword);
router.post('/', createUser);

export default router;