"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UploadProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      console.error("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/uploadProfileImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      console.log("Image uploaded successfully:", res.data.profileImageUrl);
      router.push("/homePage");
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div>
      <h2>Upload Profile Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadProfile;
