import { useEffect, useState } from 'react';
import Categories from './Categories';
import Items from './Items';
import Messages from './Messages';
import User from './User';


function AdminHomePage() {
  const [selectedTab, setSelectedTab] = useState('Users');
  const [users, setUsers] = useState(null);
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    document.title = "Admin - Sellio";

    const link = document.querySelector("link[rel='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = "/assets/images/sellio-48.png"; 
    document.head.appendChild(link);
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/user');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json(); 
        setUsers(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json(); 
        setItems(data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json(); 
        setCategories(data);
        
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
  
    fetchUsers();
    fetchItems();
    fetchCategories();
    }, []);

  
  
  return (
    <div className="grid grid-cols-12 bg-gray-100">

      <div className="col-span-2 p-4 flex flex-col ">
        <div className="flex flex-row justify-center items-center px-5 py-2 border-b cursor-pointer hover:text-gray-950 text-gray-800 border-gray-200">
          <img src="/assets/images/sellio-48.png" alt="Sellio Logo" />
          <span className='text-green-900 text-2xl font-bold'>Sellio</span>
        </div>
        
        <div
          className={`px-5 py-2 cursor-pointer border-b border-gray-200 ${
            selectedTab === 'Users'
              ? 'bg-green-900 text-white rounded-md'
              : 'hover:text-gray-950 text-gray-800'
          }`}
          onClick={() => setSelectedTab('Users')}
        >
          Users
        </div>
        
        <div
          className={`px-5 py-2 cursor-pointer border-b border-gray-200 ${
            selectedTab === 'Items'
              ? 'bg-green-900 text-white rounded-md'
              : 'hover:text-gray-950 text-gray-800'
          }`}
          onClick={() => setSelectedTab('Items')}
        >
          Items
        </div>
        
        <div
          className={`px-5 py-2 cursor-pointer border-b border-gray-200 ${
            selectedTab === 'Categories'
              ? 'bg-green-900 text-white rounded-md'
              : 'hover:text-gray-950 text-gray-800'
          }`}
          onClick={() => setSelectedTab('Categories')}
        >
          Categories
        </div>
        
        <div
          className={`px-5 py-2 cursor-pointer border-b border-gray-200 ${
            selectedTab === 'Messages'
              ? 'bg-green-900 text-white rounded-md'
              : 'hover:text-gray-950 text-gray-800'
          }`}
          onClick={() => setSelectedTab('Messages')}
        >
          Messages
        </div>
      </div>

        
      <div className="col-span-10">
        {selectedTab === 'Users' && <User users={users}/>}
        {selectedTab === 'Items' && <Items items={items}/>}
        {selectedTab === 'Categories' && <Categories categories={categories} />}
        {selectedTab === 'Messages' && <Messages />}
      </div>
        
    </div>
    )
}

export default AdminHomePage