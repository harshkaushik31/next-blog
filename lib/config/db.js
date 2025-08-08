import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect(process.env.MONOGDB_URI)
    console.log("DB Connected")
}

