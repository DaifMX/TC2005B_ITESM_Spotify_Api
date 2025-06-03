import { Router } from "express";

import FavoritesController from "../controllers/FavoritesController.js";

const controller = new FavoritesController();
const favoritesRouter = Router();

favoritesRouter.get('/', controller.getAll);
favoritesRouter.get('/getById/:id', controller.getById);
favoritesRouter.post('/create', controller.create);
favoritesRouter.put('/update/:id', controller.update);
favoritesRouter.delete('/remove/:id', controller.remove);

export default favoritesRouter;