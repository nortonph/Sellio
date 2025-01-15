import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from '../types/Item';
import { User } from '../types/User';

function Profile() {
  const { userId } = useParams(); 
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[] | null>(null);

  // Fetch the user data when the component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:3001/items/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setItems(data);
        console.log(items)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchItems();
  }, []);

  const handleRedirect = () => {
    navigate("/add-item");
  };
  const url = 'http://localhost:3001';
  if (!user) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        <div className="flex items-center bg-green-900 text-white px-6 py-4">
          <img
            src={`${url}/${user.profilePicUrl}`}
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
              <span
                className={`font-bold ${user.isAdmin ? "text-green-600" : "text-red-600"}`}
              >
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
              className="px-2 py-1 rounded-md bg-gray-100 border border-gray-200 hover:bg-gray-200"
            >
              Upload Item for Selling
            </button>
          </div>

          <ul className="mt-4">
            {items.length > 0 ? (
              items?.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between py-2 border-b last:border-none"
                >
                  <div className="flex flex-row gap-2 items-center justify-start">
                    <div>
                    <img
                      src={`${url}/${item.coverPhoto}`}
                      alt={item.title}
                      className="w-24 h-auto rounded-2xl"
                    />
                    </div>
                    <span> {item.title}</span>
                    <span style={{ color: item.isSold ? 'red' : 'green' }}>
                      {item.isSold ? 'sold' : ''}
                    </span>
                  </div>

                  <span className="text-gray-600">${item.price}</span>
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
