import express from 'express';
import controller from '../controllers/apiController.js';
const router = express.Router();


router.get("/user/:id", controller.getUser);

router.get("/users", controller.getUsers);

router.post("/user", controller.createUser);
router.patch("/api/user/:id",controller.updateUser);
router.delete("/api/user/:id", controller.deleteUser);


export default router;