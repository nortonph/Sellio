function Messages() {
  return (
    <div className="col-span-10 p-4 bg-gray-50">
      <div className="flex flex-row justify-end mx-10 my-5">
        <button className="bg-gray-200 text-gray-600 px-4 py-2 cursor-pointer rounded-lg hover:text-gray-800">Create New Message</button>
      </div>

      <div className="user-list mx-10">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Sender</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">recipient</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">timestamp</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Actions</th>
                </tr>
              </thead>

              <tbody>

                <tr className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">sender@example.com</td>
                  <td className="px-6 py-4 border-b">reciver@example.com</td>
                  <td className="px-6 py-4 border-b">2023.1.12</td>
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

export default Messages;