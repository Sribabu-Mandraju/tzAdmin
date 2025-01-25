import React, { useState, useEffect } from "react";
import { FaSearch, FaAngleDoubleLeft, FaAngleDoubleRight, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { User, MapPin, Phone, Mail, Building2, GraduationCap, Calendar, CreditCard, UserCircle2 } from "lucide-react";
import axios from "axios";
import Layout from '../../components/layouts/Layout';
import { useNavigate } from "react-router-dom";


const Users = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [editUserData, setEditUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    college: "",
    phno: "",
    year: "",
    branch: "",
    collegeId: "",
    gender: "",
    state: "",
    district: "",
    city: "",
    amountPaid: "",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  // Get admin token from localStorage
  const adminToken = localStorage.getItem('adminToken');

  // Configure axios headers with the token
  const config = {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  };

  // Fetch data from API with token
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4002/user/getAll",
          config
        );
        setData(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, [adminToken]);

  // Handle Search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Handle Category Selection
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Fetch User Details with token
  const handleViewClick = async (tzkid) => {
    try {
      const response = await axios.get(
        `http://localhost:4002/user/${tzkid}`,
        config
      );
      setUserDetails(response.data.user);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle Edit Click
  const handleEditClick = (user) => {
    setEditUserData({
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      college: user.college || "",
      phno: user.phno || "",
      year: user.year || "",
      branch: user.branch || "",
      collegeId: user.collegeId || "",
      gender: user.gender || "",
      state: user.state || "",
      district: user.district || "",
      city: user.city || "",
      amountPaid: user.amountPaid || "",
    });
    setUserDetails(user);
    setEditModalOpen(true);
  };
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!userToDelete?.tzkid) {
      console.error("No user ID available for deletion");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:4002/user/delete/${userToDelete.tzkid}`,
        config
      );
      
      if (response.status === 200) {
        // Update the local state directly by filtering out the deleted user
        setData(prevData => prevData.filter(user => user.tzkid !== userToDelete.tzkid));
        setDeleteModalOpen(false);
        setUserToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  // Handle Edit Form Change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Update User
  const handleUpdateUser = async () => {
    if (!userDetails?.tzkid) {
      console.error("No user ID available for update");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4002/user/edit/${userDetails.tzkid}`,
        editUserData,
        config
      );
      
      if (response.status === 200) {
        // Refresh the users list
        const updatedUsers = await axios.get(
          "http://localhost:4002/user/getAll",
          config
        );
        setData(updatedUsers.data.users);
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Filtered and Paginated Data
  const filteredData = (data || []).filter((item) => {
    const searchMatch = !searchTerm || Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm)
    );
    const categoryMatch = !category || item[category]?.toString().toLowerCase().includes(searchTerm);
    return searchMatch && categoryMatch;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Total Pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <Layout>
      <div className="layout">
        {/* Search and Filter Section */}
        <div className="w-full flex-wrap gap-2 flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                id="search"
                className="border border-gray-500 w-[150px] placeholder-gray-500 py-2 px-2 pr-10 rounded-md"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>

            <select
              id="category"
              name="category"
              className="border border-gray-500 w-[150px] text-gray-500 py-2 px-2 rounded-md"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Select by Category
              </option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="college">College</option>
              <option value="branch">Branch</option>
              <option value="year">Year</option>
              <option value="tzkid">Tz Kid</option>
              <option value="state">State</option>
            </select>
          </div>
          <button
            className="bg-black text-white px-3 py-2 rounded-md font-semibold"
            onClick={() => navigate("/users/create")}
          >
            Add +
          </button>
        </div>

        {/* Table Section with Horizontal Scroll */}
        <div className="w-full overflow-x-auto lg:overflow-x-auto rounded-md">
          <table className="border text-nowrap min-w-[1000px] w-full text-left rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-nowrap">#</th>
                <th className="p-3 text-nowrap">First Name</th>
                <th className="p-3 text-nowrap">Last Name</th>
                <th className="p-3 text-nowrap">Email</th>
                <th className="p-3 text-nowrap">College</th>
                <th className="p-3 text-nowrap">Branch</th>
                <th className="p-3 text-nowrap">Year</th>
                <th className="p-3 text-nowrap">Tz Kid</th>
                <th className="p-3 text-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item._id} className="border hover:bg-gray-50">
                  <td className="p-3">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className="p-3">{item.firstName}</td>
                  <td className="p-3">{item.lastName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.college}</td>
                  <td className="p-3">{item.branch}</td>
                  <td className="p-3">{item.year}</td>
                  <td className="p-3">{item.tzkid}</td>
                  <td className="p-3">
                    <div className="flex gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        onClick={() => handleViewClick(item.tzkid)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700 transition-colors"
                        onClick={() => handleEditClick(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => handleDeleteClick(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center items-center gap-2 mt-6 font-semibold">
          <button
            className="hover:bg-gray-400 px-2 py-1 rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaAngleDoubleLeft />
          </button>

          {currentPage > 2 && (
            <>
              <button
                className="px-3 py-1 rounded hover:bg-gray-200"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              {currentPage > 3 && <span className="px-2">...</span>}
            </>
          )}

          {Array.from(
            { length: Math.min(3, totalPages) },
            (_, i) => currentPage - 1 + i
          )
            .filter((page) => page > 0 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  currentPage === page ? "bg-gray-400" : "hover:bg-gray-200"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span className="px-2">...</span>}
              <button
                className="px-3 py-1 rounded hover:bg-gray-200"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="hover:bg-gray-400 px-2 py-1 rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
        {deleteModalOpen && userToDelete && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <FaTrash className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete User</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete {userToDelete.firstName} {userToDelete.lastName}? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setUserToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
{modalOpen && userDetails && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">User Details</h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setModalOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="text-gray-800 font-medium">{userDetails.firstName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="text-gray-800 font-medium">{userDetails.lastName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">{userDetails.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Building2 className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">College</p>
              <p className="text-gray-800 font-medium">{userDetails.college}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Branch</p>
              <p className="text-gray-800 font-medium">{userDetails.branch}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="text-gray-800 font-medium">{userDetails.year}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <UserCircle2 className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Tz Kid</p>
              <p className="text-gray-800 font-medium">{userDetails.tzkid}</p>
            </div>
          </div>

          {userDetails.phno && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-800 font-medium">{userDetails.phno}</p>
              </div>
            </div>
          )}
        </div>

        {(userDetails.state || userDetails.district || userDetails.city) && (
          <div className="col-span-1 md:col-span-2 space-y-4 border-t pt-4">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Location Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userDetails.state && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="text-gray-800 font-medium">{userDetails.state}</p>
                  </div>
                </div>
              )}

              {userDetails.district && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">District</p>
                    <p className="text-gray-800 font-medium">{userDetails.district}</p>
                  </div>
                </div>
              )}

              {userDetails.city && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="text-gray-800 font-medium">{userDetails.city}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

        {/* Edit Modal */}
        {editModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Edit User Details</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setEditModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={editUserData.firstName}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={editUserData.lastName}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={editUserData.email}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="college"
                      placeholder="College"
                      value={editUserData.college}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="branch"
                      placeholder="Branch"
                      value={editUserData.branch}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="year"
                      placeholder="Year"
                      value={editUserData.year}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="phno"
                      placeholder="Phone Number"
                      value={editUserData.phno}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={editUserData.state}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="district"
                      placeholder="District"
                      value={editUserData.district}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={editUserData.city}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="amountPaid"
                      placeholder="Amount Paid"
                      value={editUserData.amountPaid}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <UserCircle2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      name="gender"
                      value={editUserData.gender}
                      onChange={handleEditFormChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleUpdateUser}
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;