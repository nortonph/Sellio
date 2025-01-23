import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SinglePageSlider from '../components/SinglePageSlider';
import { Category } from '../types/Category';
import { Item as ItemType } from '../types/Item';
import { User } from '../types/User';
import { CircleX, MessageCircleQuestion } from 'lucide-react';



function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: string; content: string }[]>([]);
  const [messageContent, setMessageContent] = useState('');


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


  const handleChatApp = async () => {
    setIsChatOpen(!isChatOpen);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  const fetchResponse = async (userMessage: string) => {
    try {
      const newMessage = {
        content: userMessage,
        sender: id,
        recipient: '35883955-7b19-4840-a600-1498ef5e15cb', //! Needs to be handled properly each conversation should have its own uuid 
      }
  
      const response = await fetch('http://localhost:3001/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage), // Send user's message
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server');
      }

      const data = await response.json();
      console.log(data);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'Customer', content: userMessage },
        { sender: 'Sellio', content: data.content },
      ]);
    } catch (error) {
      console.error('Error fetching a response', error);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'Customer', content: userMessage },
        { sender: 'Sellio', content: 'Sorry, something went wrong.' }
      ]);
    }   
  }

  const sendMessage = () => {
    if (messageContent.trim() !== '') {
      fetchResponse(messageContent);
      setMessageContent('');
    }
  };

  return (
    <div> 
      <Header/>
      
        <div className='flex justify-end my-5 mx-20'>
          <BackButton />
        </div>
        <div className="flex flex-col gap-8 px-20 py-5 mt-10 text-green-950">
          <div className="flex gap-10">
            <div className="flex w-[75%]">
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

                <div className="max-w-md mx-auto">
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
                      onClick={() => window.location.href = '/checkout'}
                      className="w-full py-3 text-white bg-green-900 rounded-lg shadow-md hover:bg-green-800"
                    >
                      Buy
                    </button>
                </div>
            </div>
          </div>
        </div>
        <div className='fixed bottom-64 right-4'>
              <button 
              onClick={() => handleChatApp()}
              className="relative inline-flex h-16 w-16 p-2 overflow-hidden rounded-full focus:outline-none focus:ring-2
                focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform transition-transform duration-200 hover:scale-110">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]">
                </span>
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950
                  text-sm font-medium text-white backdrop-blur-3xl">
                  <MessageCircleQuestion />
                </span>
              </button>
          </div>
          {isChatOpen && (
            <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold mb-2">Chat with Us</h2>
                <div onClick={() => setIsChatOpen(!isChatOpen)} className="cursor-pointer"><CircleX /></div>
              </div>
              <div className="w-full h-32 border rounded-lg p-2 text-sm overflow-y-auto bg-gray-100">
                  {chatHistory.map((message, index) => (
                    <div key={index} className="mb-1">
                      <span
                        className={`font-bold ${
                          message.sender === 'Sellio' ? 'text-[#14532D]' : 'text-gray-800'
                        }`}
                      >
                        {message.sender}:
                      </span>{' '}
                      <span>{message.content}</span>
                    </div>
                  ))}</div>
              <div className="flex">
                <input
                  className="w-96 border mx-2 p-1 rounded-lg"
                  placeholder="Your request..."
                  value={messageContent}
                  onChange={handleInputChange}
                ></input>
                <button onClick={sendMessage}
                  className="mt-2 w-24 py-2 text-white bg-green-900 rounded-lg hover:bg-green-800"
                >
                  Send
                </button>
              </div>  
              
            </div>
          )}
      <Footer/>
    </div>
  )
}

export default SinglePage
