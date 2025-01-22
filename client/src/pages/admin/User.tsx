import { useEffect, useState } from "react";

function User({ users, refreshUsers }) {
  const token = localStorage.getItem("accessToken");

  const handleEdit = (userId) => {

    alert(`Edit user with ID: ${userId}`);

  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/admin/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      alert("User deleted successfully");
      refreshUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="col-span-10 p-4 bg-gray-50">
      <div className="flex flex-row justify-end mx-10 my-5">
        <button className="bg-gray-200 text-gray-600 px-4 py-2 cursor-pointer rounded-lg hover:text-gray-800">Create New User</button>
      </div>

      <div className="user-list mx-10">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Email</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Contact Info</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Is Admin</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Items Sold</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users && users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{user.email}</td>
                <td className="px-6 py-4 border-b">{user.contactInfo}</td>
                <td className="px-6 py-4 border-b">{user.isAdmin ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 border-b">{user.itemsSold}</td>
                <td className="px-6 py-4 border-b flex space-x-4">
                  <button onClick={() => handleEdit(user._id)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;