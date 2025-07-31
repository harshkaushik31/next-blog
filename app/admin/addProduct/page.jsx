"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Harsh Kaushik",
    authorImg: "/authorImage.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    const response = await axios.post("/api/blog", formData);

    if (response.data.success) {
      toast.success(response.data.msg);

      setData({
        title: "",
        description: "",
        category: "",
        author: "",
        authorImg: "",
      });
      setImage(false);

      e.target.reset();
    } else {
      toast.error("Error");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
            className="mt-4"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          type="text"
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          placeholder="Type here"
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border rounded-sm"
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          type="text"
          placeholder="Write content here"
          rows={6}
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border rounded-sm"
        />

        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500 rounded-sm"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-black text-white rounded-sm"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default page;
