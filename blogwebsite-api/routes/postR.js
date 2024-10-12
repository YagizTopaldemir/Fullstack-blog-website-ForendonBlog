import express from "express";
import { createSinglepost, deleteSinglepost, getAllpost, getSinglePost, updateSinglepost } from "../controllers/postC.js";

const router = express.Router()

router.get("/",getAllpost)
router.get("/:id",getSinglePost)
router.post("/",createSinglepost)
router.put("/:id",updateSinglepost)
router.delete("/:id",deleteSinglepost)


export default router
