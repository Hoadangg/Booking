import express from "express";
import { getTour, getTours, createTour } from "../controllers/tour.js";

const router = express.Router();
// GET ONE tour
router.get("/:id", getTour);

// GET all tour
router.get("/", getTours);

// Create tour
router.post("/", createTour);

export default router;
