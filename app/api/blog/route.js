import { connectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises"
import { Edu_AU_VIC_WA_NT_Guides } from "next/font/google";
const { NextResponse } = require("next/server")
const fs = require('fs')

const loadDB = async () => {
    await connectDB();
}

loadDB();

// API End point for getting all blogs
export async function GET(request){

    const blogId = request.nextUrl.searchParams.get("id")
    if(blogId){
        const blog = await BlogModel.findById(blogId);

        return NextResponse.json({blog})
    }
    else{
        const blogs = await BlogModel.find({})
        return NextResponse.json({blogs})
    }

}

// API End point for uploading blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');

    if (!image || typeof image.arrayBuffer !== 'function') {
      return NextResponse.json(
        { success: false, message: 'No image uploaded or invalid format' },
        { status: 400 }
      );
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imageURL = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      image: imageURL,
      authorImg: `/authorImg.png`,
    };

    await BlogModel.create(blogData);
    console.log('Blog Saved:', imageURL);

    return NextResponse.json({ success: true, msg: 'Blog Added' });
  } catch (error) {
    console.error('Error in POST /api/blog:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}


// Creating api end-point to delete blog
export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');

    const blog = await BlogModel.findById(id);
    fs.unlink(`./public/${blog.image}`,()=>{});

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({message: "Blog Deleted"})
}