import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import {
  FaSearch,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

const Notifications = () => {
  const navigate = useNavigate();

  const initialData = [
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    {
      id: 1,
      name: "hi",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "890",
    },
    {
      id: 2,
      name: "hello",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "89",
    },
    {
      id: 3,
      name: "hey",
      status: "successful",
      type: "assigned",
      email: "abc@gmail.com",
      sign: "1 year ago",
      userId: "8",
    },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  // Handle Search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Handle Category Selection
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Paginated Data
  const paginatedData = data
    .filter((item) => {
      if (!category || !searchTerm) return true;
      return item[category]?.toString().toLowerCase().includes(searchTerm);
    })
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Total Pages
  const totalPages = Math.ceil(
    data.filter((item) => {
      if (!category || !searchTerm) return true;
      return item[category]?.toString().toLowerCase().includes(searchTerm);
    }).length / rowsPerPage
  );

  return (
    <Layout>
      {/* Add Button */}
      <div className="w-full  flex items-center justify-between mb-4">
        <div className="flex gap-4 ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              id="search"
              className="w-auto border border-gray-500 placeholder-gray-500 py-2 px-2 pr-10 rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute right-3 top-2 text-gray-500" />
          </div>

          <select
            id="category"
            name="category"
            className="border border-gray-500 text-gray-500 py-2 px-2 rounded-md"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Select by Category
            </option>
            <option value="id">Id</option>
            <option value="name">Full Name</option>
            <option value="status">Status</option>
            <option value="type">Type</option>
            <option value="email">Email</option>
            <option value="sign">Signed up</option>
            <option value="userId">User Id</option>
          </select>
        </div>
        <button
          className="bg-black text-white px-3 py-2 rounded-md font-semibold"
          onClick={() => navigate("/notifications/create")}
        >
          Add +
        </button>
      </div>

      {/* Search and Filter */}

      {/* Table */}
      <div className="w-full overflow-x-scroll lg:overflow-x-hidden rounded-md">
        <table className="border w-full text-left rounded-md">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Id</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Type</th>
              <th className="p-3">Email</th>
              <th className="p-3">Signed Up</th>
              <th className="p-3">User Id</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.sign}</td>
                <td className="p-3">{item.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* Pagination */}
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
    </Layout>
  );
};

export default Notifications;
