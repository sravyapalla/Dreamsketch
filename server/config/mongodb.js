import mongoose from "mongoose"

const connectDB=async()=>{


    mongoose.connection.on('connected',()=>{
        console.log("DATABASE CONNECTED")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/dreamsketch`)
}
export default connectDB