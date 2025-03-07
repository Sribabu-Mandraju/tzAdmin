import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FaSearch } from "react-icons/fa"
import { fetchEvents } from "../../store/slices/eventSlice"
import Layout from "../../components/layouts/Layout"
import EventCard from "./EventCard"

const Events = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: events, status, error } = useSelector((state) => state.events)

  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents())
    }
  }, [status, dispatch])

  useEffect(() => {
    applyFilters(searchQuery, selectedCategory)
  }, [searchQuery, selectedCategory]) // Removed unnecessary 'events' dependency

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value)
  }

  const applyFilters = (search, category) => {
    let filtered = events || []

    if (search) {
      filtered = filtered.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category) {
      filtered = filtered.filter((event) => event.dep.toLowerCase() === category.toLowerCase())
    }

    setFilteredEvents(filtered)
  }

  if (status === "loading") {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (status === "failed") {
    return (
      <Layout>
        <div>Error: {error}</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-full flex items-center justify-between flex-wrap gap-[10px]">
        <div className="filtering flex flex-wrap gap-[10px] items-center">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="border border-gray-500 w-[150px] text-gray-900 placeholder-gray-900 py-2 px-2 pr-10 rounded-md outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Category Filter */}
          <select
            name="category"
            value={selectedCategory}
            onChange={handleFilter}
            className="border border-gray-500 w-[150px] text-gray-500 py-2 px-2 rounded-md outline-none"
          >
            <option value="">All Departments</option>
            <option value="PUC">PUC</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="MME">MME</option>
            <option value="CIVIL">CIVIL</option>
            <option value="CHEM">CHEM</option>
          </select>
        </div>

        {/* Add Event Button */}
        <button
          className="bg-black text-white px-3 py-2 rounded-md font-semibold"
          onClick={() => navigate("/events/create")}
        >
          Add +
        </button>
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap gap-8 justify-center lg:justify-start items-center py-[20px]">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </Layout>
  )
}

export default Events

