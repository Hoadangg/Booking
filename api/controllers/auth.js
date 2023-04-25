import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { confirmPassword, token, ...data } = req.body;

    const newUser = new User({
      ...data,
      password: hash,
    });
    console.log(newUser);

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    // { expiresIn: "10h" }

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const sendMail = async (req, res) => {
  const { email } = req.body;
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
  const token = jwt.sign({ email }, process.env.JWT);
  const link = `http://localhost:3005/register?token=${token}`;
  await transporter.sendMail(
    {
      from: "harrynguyen456@gmail.com",
      to: `${email}`,
      subject: "Hello",

      html: `<h2>this link valid only in 5 minute</h2> <a href= ${link}> Click here to continue</a>`,
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
};
