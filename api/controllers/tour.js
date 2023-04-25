import Tour from "../models/Tour.js";


export const getTour = async (req,res,next)=>{
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json(tour);
  } catch (err) {
    next(err);
  }
};

export const getTours = async (req,res,next)=>{
    try {
      const tours = await Tour.find();
      res.status(200).json(tours);
    } catch (err) {
      next(err);
    }
  };

  export const createTour = async (req, res, next) => {
    const newTour = new Tour(req.body);
  
    try {
      const savedTour = await newTour.save();
      res.status(200).json(savedTour);
    } catch (err) {
      return res.status(403);
    }
  };
