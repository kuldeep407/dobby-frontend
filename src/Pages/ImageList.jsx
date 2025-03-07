import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ImageList = ({ folderId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  const fetchImages = async () => {
    if (!token) {
      toast.error("Unauthorized! Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/get-images`, {
        params: { folderId },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data.success && Array.isArray(response.data.images)) {
        setImages(response.data.images);
      } else {
        console.error(response.data);
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  const searchImages = async (query) => {
    if (!token) {
      toast.error("Unauthorized! Please log in.");
      return;
    }

    if (!query) {
      fetchImages(); 
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/search-image`, {
        params: { query },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setImages(response.data.images);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error searching images:", error);
      // toast.error("Failed to search images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [folderId, token]);

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-3 text-center md:text-left">
        Images
      </h2>

      <div className="mb-4 flex flex-col md:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            searchImages(e.target.value);
          }}
          className="border p-2 border-gray-300 rounded-sm w-full md:w-1/2"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading images...</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="border border-gray-300 p-3 rounded-sm shadow-md"
            >
              <p className="text-center text-sm font-semibold mb-2">
                {img.name}
              </p>
              <img
                src={`http://localhost:3000${img.imageUrl}`}
                alt={img.name}
                className="w-full h-50 object-fit rounded-sm"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No images found.</p>
      )}
    </div>
  );
};

export default ImageList;
