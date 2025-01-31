import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorkshopEdit from "./WorkshopEdit"; // Make sure to import WorkshopEdit
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshops } from "../../store/slices/workshopSlice";

const WorkshopCard = ({ workshop, onViewMore, onEdit, onDelete }) => {
  const truncateName = (name) => {
    return name.length > 20 ? name.substring(0, 20) + "..." : name;
  };

  return (
    <div className="workshop-card p-4 border rounded-lg shadow-md bg-white bg-opacity-10 backdrop-blur-md flex flex-col justify-between h-full">
      <div>
        <div className="image-container mb-4">
          <img
            src={workshop.workshopImg}
            alt="Workshop"
            className="workshop-image w-full h-48 object-cover rounded-md"
          />
        </div>
        <h3 className="font-bold text-lg mb-2">
          {truncateName(workshop.name)}
        </h3>
        <p className="text-left mb-1">Department: {workshop.dep}</p>
        <p className="text-left mb-1">Entry Fee: {workshop.entryFee}</p>
        <p className="text-left mb-1">
          Registration Count: {workshop.regStudents.length}
        </p>
      </div>
      <div className="flex justify-between mt-4 space-x-2">
        <button
          className="bg-[#0f368ab6] text-white px-2 py-1 rounded-md font-semibold"
          onClick={() => onViewMore(workshop)}
        >
          View More
        </button>
        <div className="flex space-x-2">
          <button
            className="bg-[#17915ce1] text-white px-2 py-1 rounded-md font-semibold"
            onClick={() => onEdit(workshop)}
          >
            Edit
          </button>
          <button
            className="bg-[#871515dc] text-white px-2 py-1 rounded-md font-semibold"
            onClick={() => onDelete(workshop)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Workshops = () => {
  const dispatch = useDispatch();
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const workshopsData = useSelector((state) => state.workshops);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchWorkshops = () => {
      setWorkshops(workshopsData);
      setFilteredWorkshops(workshopsData); // Initially display all workshops
    };

    fetchWorkshops();
  }, []);

  useEffect(() => {
    filterWorkshops();
  }, [selectedDepartment, searchTerm]);

  const handleViewMore = (workshop) => {
    navigate(`/workshops/${workshop._id}`);
  };

  const handleEdit = (workshop) => {
    setEditingWorkshop(workshop);
  };

  const handleDelete = async (workshop) => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No adminToken found in local storage");
      return;
    }
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the workshop "${workshop.name}"?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/workshops/delete/${workshop._id}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setWorkshops(workshops.filter((w) => w._id !== workshop._id));
        setFilteredWorkshops(
          filteredWorkshops.filter((w) => w._id !== workshop._id)
        );
        toast.success("Workshop deleted successfully!");
      } catch (error) {
        console.error("Error deleting workshop:", error);
        toast.error("Failed to delete workshop.");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      dispatch(fetchWorkshops);
      setFilteredWorkshops(response.data);
      setEditingWorkshop(null);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const filterWorkshops = () => {
    let filtered = workshops;

    if (selectedDepartment !== "ALL") {
      filtered = filtered.filter(
        (workshop) => workshop.dep === selectedDepartment
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((workshop) =>
        workshop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWorkshops(filtered);
  };

  const workshopCards = filteredWorkshops.map((item, index) => (
    <WorkshopCard
      key={index}
      workshop={item}
      onViewMore={handleViewMore}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ));

  return (
    <Layout>
      <div className="w-full flex items-center justify-between flex-wrap gap-[10px]">
        <div className="filtering flex gap-[10px] flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="search"
              className="border border-gray-500 w-[150px] text-gray-600 placeholder-gray-500 py-2 px-2 pr-10 rounded-md outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>
          <select
            name="category"
            id="category"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-500 w-[150px] text-gray-500 py-2 px-2 rounded-md outline-none p-[8px]"
          >
            <option value="ALL">ALL</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="PUC">PUC</option>
            <option value="MECH">MECH</option>
            <option value="EEE">EEE</option>
            <option value="MME">MME</option>
            <option value="CHEM">CHEM</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>
        <button
          className="bg-black text-white px-3 py-2 rounded-md font-semibold"
          onClick={() => navigate("/workshops/create")}
        >
          Add +
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center lg:justify-start items-center py-[20px]">
        {workshopCards}
      </div>
      {editingWorkshop && (
        <WorkshopEdit
          workshop={editingWorkshop}
          onClose={() => setEditingWorkshop(null)}
          onUpdate={handleUpdate}
        />
      )}
    </Layout>
  );
};

export default Workshops;
