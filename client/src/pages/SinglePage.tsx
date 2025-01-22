import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SinglePageSlider from '../components/SinglePageSlider';
import { Category } from '../types/Category';
import { Item as ItemType } from '../types/Item';
import { User } from '../types/User';



function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);


  const url = 'http://localhost:3001';

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:3001/item/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the item');
        }
        const data = await response.json();
        setItem(data); // Set the item
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    if (item?.userId) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:3001/user/${item.userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch the user');
          }
          const data = await response.json();
          setUser(data); // Set the user
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }
  }, [item?.userId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3001/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryNames = item?.category
    ?.map((catId) => categories.find((cat) => cat._id === catId)?.name || '')
    .join(', ');

  return (
    <div> 
      <Header/>
      
        <div className='flex justify-end my-5 mx-20'>
          <BackButton />
        </div>
        <div className="flex flex-col gap-8 px-20 py-5 mt-10 text-green-950">
          <div className="grid grid-cols-2 gap-10">

            <div className="flex-1 items-center ">

              <div className=" mb-5">
                <img
                  src={`${url}/${item?.coverPhoto}`}
                  alt="Product"
                  className=" w-auto h-96 object-contain rounded-lg shadow-md"
                />
              </div>

              <div className="flex gap-3">
                <SinglePageSlider images={item?.images || []} />
              </div>
            </div>

            <div className="flex-1 max-w-md">
                <h1 className="text-3xl font-bold mb-3">{item?.title}</h1>
                <div className="text-2xl font-semibold text-green-900 mb-5">${item?.price}</div>

                <div className="mb-5">
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Category:</span> {categoryNames}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">City:</span> {item?.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Country:</span> {item?.country}
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5">
                  <h2 className="font-semibold text-lg mb-2">Contact Seller</h2>
                  <div className="flex flex-row items-center gap-2">
                    <img 
                    className="w-12 rounded-full"
                    src={`${url}/${user?.profilePicUrl}`} 
                    alt="profile pic" 
                    />
                    <a href={`/profile/${item?.userId}`} className="hover:underline">
                      <p className="text-sm text-gray-600 font-bold">{user?.email}</p>
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 ml-2 mt-2">Phone: {user?.contactInfo}</p>
                  <p className="text-sm text-gray-600 ml-2">Email: {user?.email}</p>
                </div>

                <button
                  onClick={() => window.location.href = '/chat'}
                  className="w-full py-3 text-white bg-green-900 rounded-lg shadow-md hover:bg-green-800"
                >
                  Go to Chat
                </button>
            </div>
          </div>
        </div>

      <Footer/>
    </div>
  )
}

export default SinglePage