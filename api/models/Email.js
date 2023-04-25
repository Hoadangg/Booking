import mongoose from "mongoose";
const EmailSchema = new mongoose.Schema({
    email:{type: String}


})
export default mongoose.model("Email", EmailSchema)