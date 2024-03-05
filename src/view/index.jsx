import React, { useEffect, useState } from "react";
import { data } from "../utilities/data.js";
import UserTable from "./user-table.jsx";
import AreaChart from "../utilities/chart.js";

function Dashboard() {
  const [tables, setTables] = useState([]);
  const [filteredTables, setFilteredTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [name, setName] = useState("");
  const [responseType, setResponseType] = useState("text");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);
//Fetch table data
  const fetchTables = async () => {
    setTables(data);
    setFilteredTables(data);
  };

  //handle upload that accepts all files including csv
  const handleUpload = async (event) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("tableName", name);
      fetchTables();
    }
  };

  //filter table by search
  const handleSearch = (value) => {
    const filtered = tables.filter((table) =>
      table.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTables(filtered);
  };

  const handleToggle = () => {
    setResponseType(responseType === "text" ? "png" : "text");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_name: selectedTable,
          prompt,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      console.error("Error running query:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          name="file"
          className="mb-2"
        />
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleSearch(e.target.value);
          }}
          className="mb-2 p-2 border rounded-md w-full"
        />

        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="mb-2 p-2 border rounded-md w-full"
        >
          {filteredTables.map((table) => (
            <option key={table?.id} value={table?.id}>
              {table?.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>

        <label className="flex items-center mt-2">
          Display as:
          <input
            type="checkbox"
            checked={responseType === "png"}
            onChange={handleToggle}
            className="ml-2 form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">
            {responseType === "png" ? "Image" : "Text"}
          </span>
        </label>

        {responseType !== "png" ? (
          <p className="text-left mt-3">
            Design a frontend user interface for a workflow where users can
            upload CSV files to a PostgreSQL database, specify a table name at
            the point of upload, preview the list of tables in the database, and
            interact with the data using prompts. Additionally, users should be
            able to toggle between displaying text responses and matplotlib
            chart images for their queries.
          </p>
        ) : responseType === "text" ? (
          <pre className="mt-2 p-2 bg-gray-100 rounded-md overflow-auto">
            {response}
          </pre>
        ) : (
          <AreaChart
            xAxisData={filteredTables.map((item) => item?.date) || []}
            yAxisData={filteredTables.map((item) => item?.id) || []}
          />
        )}
      </div>

      <UserTable filteredTables={filteredTables} />
    </>
  );
}

export default Dashboard;
