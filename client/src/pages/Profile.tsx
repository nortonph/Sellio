import { useNavigate } from 'react-router-dom';


function Profile() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/add-item'); 
  };

  const user = {
    email: "user@example.com",
    profilePicUrl: "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp",
    contactInfo: "123-456-7890",
    isAdmin: true,
    itemsSold: [
      { id: 1, name: "Item 1", price: "$20", coverPhoto: "https://i.ebayimg.com/images/g/b5YAAOSwqnFnZ8Qs/s-l1600.webp" },
      { id: 2, name: "Item 2", price: "$35",  coverPhoto: "https://i.ebayimg.com/images/g/b5YAAOSwqnFnZ8Qs/s-l1600.webp"  },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center bg-green-900 text-white px-6 py-4">
          <img
            src={user.profilePicUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{user.email}</h1>
            <p className="text-sm">{user.contactInfo}</p>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700">Profile Information</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between border-b py-2">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900">{user.email}</span>
            </li>
            <li className="flex justify-between border-b py-2">
              <span className="text-gray-600">Contact Info:</span>
              <span className="text-gray-900">{user.contactInfo}</span>
            </li>
            <li className="flex justify-between border-b py-2">
              <span className="text-gray-600">Admin Status:</span>
              <span className={`font-bold ${user.isAdmin ? "text-green-600" : "text-red-600"}`}>
                {user.isAdmin ? "Yes" : "No"}
              </span>
            </li>
          </ul>
        </div>

        {/* Items Sold Section */}
        <div className="p-6 bg-gray-50">
          

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Items</h2>
            <button
             onClick={handleRedirect} 
             className="px-2 py-1 rounded-md bg-gray-100 border border-gray-200 hover:bg-gray-200" >
              Upload Item for Selling
            </button>
          </div>

          <ul className="mt-4">
            {user.itemsSold.length > 0 ? (
              user.itemsSold.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between py-2 border-b last:border-none"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <img src={item.coverPhoto} alt={item.name} className="w-12 h-auto rounded-2xl "/>
                    <span>{item.name}</span>
                  </div>
                  
                  <span className="text-gray-600">{item.price}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-600 mt-4">No items sold yet.</p>
            )}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Profile;
