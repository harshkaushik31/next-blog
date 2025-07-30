import { connectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises"
const { NextResponse } = require("next/server")

const loadDB = async () => {
    await connectDB();
}

loadDB();

export async function GET(request){
    return NextResponse.json({message: 'API Working'})
}

export async function POST(request){
    const formData = await request.formData();
    const timestamp = Date.now();
   
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}` 
    await writeFile(path, buffer);
    const imageURL = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imageURL}`,
        authorImg: `${formData.get('authorImage')}`
    }

    await BlogModel.create(blogData);
    console.log('Blog Saved');
    
    console.log(imageURL);

    return NextResponse.json({success: true,msg: "Blog Added"})
}