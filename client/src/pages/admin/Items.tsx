function Items({items}) {
  return (
    <div className="col-span-10 p-4 bg-gray-50">
        <div className="flex flex-row justify-end mx-10 my-5">
          <button className="bg-gray-200 text-gray-600 px-4 py-2 cursor-pointer rounded-lg hover:text-gray-800">Create New Item</button>
        </div>

        <div className="user-list mx-10">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">title</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">price</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">category</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">city</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">country</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">datePosted</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">isBanner</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">isSold</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">userId</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items && items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{item.title}</td>
                  <td className="px-6 py-4 border-b">{item.price}$</td>
                  <td className="px-6 py-4 border-b">
                    {item.categories && item.categories.map((category, idx) => (
                      <span key={idx} className="bg-gray-100 px-2 py-1 mx-1 rounded-lg">{category}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 border-b">{item.city}</td>
                  <td className="px-6 py-4 border-b">{item.country}</td>
                  <td className="px-6 py-4 border-b">{item.datePosted}</td>
                  <td className="px-6 py-4 border-b">{item.isBanner ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 border-b">{item.isSold ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 border-b">{item.userId}</td>
                  <td className="px-6 py-4 border-b flex space-x-4">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Items;