import React from "react";

function UserTable({ filteredTables }) {

  return (
    <div className="mx-20">
      <h2>User Table</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Age
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTables.map((table) => (
            <tr key={table?.id}>
              <td className="px-6 py-4 whitespace-nowrap">{table?.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{table?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{table?.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{table?.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{table?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
