import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import  {createAchievment, deleteAchievments, editAchievments, getAchievments}  from "../controllers/achievments.controller.js";

const router = Router();
router.post("/createachievment", verifyJWT, createAchievment);
router.get("/getachievment",  getAchievments);
router.delete("/deleteachievment/:userId/:achievmentId", verifyJWT, deleteAchievments);
router.put("/editachievment/:userId/:achievmentId", verifyJWT, editAchievments);

export default router;