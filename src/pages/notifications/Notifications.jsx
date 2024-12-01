import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import DataTable from 'react-data-table-component';

const Notifications = () => {
<<<<<<< HEAD
  const columns = [
    {
      name: "SNO",
      selector: (row) => row.SNO,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name:"action",
      button:true,
      cell:(row)=>(
  <div className="flex flex-row gap-[10px] items-center justify-center mr-[20px]">
    <button className="bg-[red] text-white w-[50px] h-[20px]" onClick={()=>handleEdit(row.id)} >EDIT</button>
    <button className="bg-[yellow] text-black w-[50px] h-[20px]" onClick={()=>handleDelete(row.id)}>DELETE</button>
  </div>
    ),
  },
  ];
const handleDelete=(id)=>{
const filterdata=records.filter((row)=>row.id!=id);
setRecords(filterdata);
=======
    const navigate = useNavigate()
  return (
    <Layout>
      {/* <div className="text-center text-5xl">Notifications</div> */}
      <div className="w-full flex items-center justify-end">
      <button className="px-3 py-2 bg-black rounded-md text-white" onClick={() => navigate("/notifications/create")}>Create Notification</button>
      </div>
    </Layout>
  )
>>>>>>> f8af02d8f343b3f462e45c282429e7e97f3d7dac
}
const handleEdit=(id)=>{
  console.log("Edit row with id:", id);
}
  const data = [
    { id: 1, SNO: "1", title: "PUC Club", time: "5.00" },
    { id: 2, SNO: "2", title: "CSE Club", time: "4.30" },
    { id: 3, SNO: "3", title: "ECE Club", time: "6.00" },
    { id: 4, SNO: "4", title: "EEE Club", time: "4.00" },
  ];

  const [records, setRecords] = useState(data);
  function handleFilter(event) {
    const filterText = event.target.value.toLowerCase();
    const filteredData = data.filter(row =>
      row.title.toLowerCase().includes(filterText)
    );
    setRecords(filteredData); 
  }

  return (
    <div className="m-[100px]">
      <div>
        <input
          type="text"
          className="h-[40px] w-[300px] border-black border-2 mr-0 top-[10px]"
          placeholder="Search by title"
          onChange={handleFilter} 
        />
      </div>

      <DataTable
        columns={columns}
        data={records} 
        fixedHeader
        pagination
      className=" border-2 border-gray text-[20px] mt-[20px]"/>
    </div>
  );
};

export default Notifications;
