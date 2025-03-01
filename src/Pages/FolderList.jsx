import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; 
import toast from "react-hot-toast";
import CreateFolder from "./CreateFolder";
import UploadImage from "./UploadImage";
import ImageList from "./ImageList";

const FolderList = ({ parentId = null }) => {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchFolders = async () => {
    if (!token) {
      toast.error("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/get-folders", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data && Array.isArray(response.data.folders)) {
        setFolders(response.data.folders);
      } else {
        console.error("Unexpected API response:", response.data);
        setFolders([]);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      toast.error("Failed to fetch folders.");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [token]);

  const handleFolderCreated = (newFolder) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      const response = await axios.get(`http://localhost:3000/delete-folder/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Folder deleted successfully!");
        setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== folderId));
      } else {
        toast.error("Failed to delete folder.");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Error deleting folder.");
    }
  };

  return (
    <div className="p-4 w-full max-w-6xl mx-auto mt-[60px] ">
      <h2 className="text-xl font-bold mb-3 text-center md:text-left">Folders</h2>
      <CreateFolder parentId={parentId} onFolderCreated={handleFolderCreated} />

      <ul className="space-y-3 mt-4">
        {folders?.length > 0 ? (
          folders
            .filter((folder) => folder && folder.parentId === parentId)
            .map((folder) => (
              <li key={folder._id} className="border border-gray-300 p-3 rounded-sm shadow-sm bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <strong className="text-lg">{folder.name}</strong>
                  <button
                    onClick={() => handleDeleteFolder(folder._id)}
                    className="text-red-500 hover:text-red-700 flex justify-between items-center"
                    title="Delete Folder"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>

                <div className="ml-4 md:ml-6">
                  <FolderList parentId={folder._id} />
                </div>

                <UploadImage folderId={folder._id} refreshImages={() => {}} />
                <ImageList />
              </li>
            ))
        ) : (
          <p className="text-gray-500 text-center md:text-left">No folders found.</p>
        )}
      </ul>
    </div>
  );
};

export default FolderList;
