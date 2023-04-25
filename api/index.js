import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import tourRoute from "./routes/tour.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import { createError } from "./utils/error.js";
import Email from "./models/Email.js";
import { verifyAdmin } from "./utils/verifyToken.js";
import { getEmail } from "./utils/getEmail.js";
import nodemailer from "nodemailer";
import multiparty from "connect-multiparty";
import morgan from "morgan";
import fs from "fs";
import * as Cloudinary from "cloudinary";
// Return "https" URLs by setting secure: true

const MultiPartyMiddleware = multiparty({ uploadDir: "./images" });

const app = express();
dotenv.config();

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// app.use(express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(multiparty({ uploadDir: "./images" }));

app.use("/images", express.static("images"));

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await Cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

app.post("/uploads", MultiPartyMiddleware, async (req, res) => {
  console.log(req.files.upload);
  const publicId = await uploadImage(req.files.upload.path);
  console.log(">>>Publicid:", publicId);
  console.log("------------------------------");
  // const bitmap = fs.readFileSync(req.files.upload.path);
  // const base64 = new Buffer(bitmap).toString("base64");

  res.status(200).json({
    uploaded: true,
    url: publicId.secure_url,
    // url: "data:" + req.files.upload.type + ";base64," + base64,
    //url: "https://canary.contestimg.wish.com/api/webimage/60c079b76524d848bd130e00-normal.jpg?cache_buster=3e4dcd713fbb82b5444641d13ba1505f",
  });
});

app.post("/get-email", async (req, res, next) => {
  // console.log(req.body);
  try {
    const newEmail = new Email({
      ...req.body,
    });
    console.log(newEmail);
    await newEmail.save();
    res.status(200).json(newEmail);
  } catch (err) {
    next(err);
  }
});

app.get("/api/mails", async (req, res, next) => {
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (err) {
    next(err);
  }
});
app.delete("/api/mails/:id", verifyAdmin, async (req, res, next) => {
  try {
    await Email.findByIdAndDelete(req.params.id);
    res.status(200).json("Email has been deleted.");
  } catch (err) {
    next(err);
  }
});
app.post("/api/mails", verifyAdmin, getEmail, async (req, res) => {
  const email = req.body.mailList;
  console.log("<<< MAIL: ", req.body);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "harrynguyen456@gmail.com",
      pass: "upetskxegbycxalb",
    },
  });
  // , { expiresIn: "300" }
  const token = jwt.sign({ email }, process.env.JWT);
  const link = `http://localhost:3005/register?token=${token}`;
  // return;
  await transporter.sendMail(
    {
      from: "harrynguyen456@gmail.com",
      to: `${email}`,
      // to: `19119161@student.hcmute.edu.vn`,
      subject: req.body.title,
      html: req.body.detail,
      // html: link,
    },
    (err) => {
      if (err) {
        return res.json({
          message: "errorororor",
          err,
        });
      }
      return res.json({
        message: `da gui mail thanh cong cho tai khoan ${email}`,
      });
    }
  );
});

// app.post("/create-account", async (req, res, next) => {
//   const { token,username,password,phone,country,city } = req.body;

//   jwt.verify(token, process.env.JWT, (err, data) => {
//     if (err) return next(createError(403, "Token is not valid!"));

//     const email = data.email;
//      const userInfo = {
//       "username":username,
//       "email":email,
//       "password":password,
//       "phone":phone,
//       "country":country,
//       "city":city 

//     }

//   });
// });

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/tours", tourRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
