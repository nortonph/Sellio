function User() {
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

                <tr className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">user1@example.com</td>
                  <td className="px-6 py-4 border-b">123-456-7890</td>
                  <td className="px-6 py-4 border-b">Yes</td>
                  <td className="px-6 py-4 border-b">10</td>
                  <td className="px-6 py-4 border-b flex space-x-4">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>

                
              </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;