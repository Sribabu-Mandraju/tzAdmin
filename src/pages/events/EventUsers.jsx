import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from '../../components/layouts/Layout';
const EventDetails = () => {
  const { id } = useParams();
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Get the token from localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Add the bearer token in the headers
          },
        };

        // Step 1: Fetch the event data to get `registeredStudents`
        const eventResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}`,
          config
        );
        // Ensure `registerdStudents` is an array of IDs
        setEventName(eventResponse.data.name);
        let students = eventResponse.data.registerdStudents;
        console.log(students);

        // Handle potential nesting (just in case)
        if (Array.isArray(students) && students.some(Array.isArray)) {
          students = students.flat();
        }

        setRegisteredStudents(students);

        // Step 2: Fetch all users
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/getAll`,
          config
        );
        const allUsers = userResponse.data.users;

        // Step 3: Filter the users to find only those with `tzkid` in `registeredStudents`
        const filteredUsers = allUsers.filter((user) =>
          students.includes(user.tzkid)
        );
        setUsersData(filteredUsers);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchEventData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <Layout>
    <div>
    <div className="flex justify-center items-center">
      <span className="font-bold text-3xl">{eventName} </span><span className="ml-2 text-xl">registered Students</span>
    </div>
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "90%",
          textAlign: "center",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          margin: "20px auto",
        }}
      >
        <thead className="bg-black">
          <tr>
            <th>TZKID</th>
            <th>Branch</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr
              key={user.tzkid}
              style={{ cursor: "pointer" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0a69a5")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <td>{user.tzkid.toUpperCase()}</td>
              <td>{user.branch}</td>
              <td>{truncateString(user.email, 20)}</td>
              <td>{truncateString(user.city, 6)}</td>
              <td>{user.phno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default EventDetails;
