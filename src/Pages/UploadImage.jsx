import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UploadImage = ({ folderId, refreshImages }) => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!image || !imageName)
      return toast.error("Enter image name and select an image");
    if (!token) return toast.error("You must be logged in to upload images");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", imageName);
    formData.append("image", image);
    formData.append("folderId", folderId);

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Image uploaded successfully!");
      setImage(null);
      setImageName("");
      refreshImages();
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error("Failed to upload image");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 p-4 w-full max-w-5xl mx-auto border border-gray-300 rounded-sm shadow-md">
      <input
        type="text"
        placeholder="Enter image name"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
        className="border p-2 border-gray-300 rounded-sm w-full md:w-auto flex-1"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border text-gray-500 p-2 border-gray-300 rounded-sm w-full md:w-auto flex-1 cursor-pointer focus:outline-none"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600 transition w-full md:w-auto"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default UploadImage;
