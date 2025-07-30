import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hindi_yt_backend:pass1234@cluster0.7bgpcdg.mongodb.net/blog-app')
    console.log("DB Connected")
}

