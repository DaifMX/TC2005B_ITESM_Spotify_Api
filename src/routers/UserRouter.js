import { Router } from "express";

import UserController from "../controllers/UserController.js";

const controller = new UserController();
const userRouter = Router();

userRouter.get('/', controller.getAll);
userRouter.get('/getById/:id', controller.getById);
userRouter.post('/create', controller.create);
userRouter.put('/update/:id', controller.update);
userRouter.delete('/remove/:id', controller.remove);

export default userRouter;