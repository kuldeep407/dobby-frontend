import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateFolder = ({ parentId, onFolderCreated }) => {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Enter a valid folder name");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create folders");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/create-folder`,
        { name: folderName, parentId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Folder created successfully!");
        setFolderName(""); 
        onFolderCreated(response.data.folder); 
      } else {
        toast.error(response.data.message || "Failed to create folder");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error(error.response?.data?.message || "Failed to create folder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 p-4 border border-gray-300 rounded-sm shadow-sm w-full">
      <input
        type="text"
        placeholder="Enter folder name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="border border-gray-300 p-2 rounded-sm w-full md:w-auto focus:outline-none "
      />
      <button
        onClick={handleCreateFolder}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-sm w-full md:w-auto hover:bg-blue-600 transition duration-300 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Folder"}
      </button>
    </div>
  );
};

export default CreateFolder;
