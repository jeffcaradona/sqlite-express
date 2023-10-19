import express from 'express';
import controller from '../controllers/apiController.js';
const router = express.Router();



router.get("/users", controller.getUsers);
router.get("/user/:id", controller.getUser);
router.post("/user", controller.createUser);
router.patch("/user/:id",controller.updateUser);
router.delete("/user/:id", controller.deleteUser);


export default router;