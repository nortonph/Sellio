import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Item from '../components/Item';
import { Item as ItemType } from '../types/Item';

function SinglePage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  const [items, setItems] = useState<ItemType[] | null>(null);

  useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch(`http://localhost:3001/search?q=${searchQuery}`);
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
          const data = await response.json();
          setItems(data.items); 

        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchItems();
    }, [searchQuery]);

  return (
    <div>
      
      <Header/>
      
      <div className='flex flex-col gap-3 text-green-950 px-20 py-5'>
        
        <div className="flex flex-col gap-8 px-20 py-5 mt-10 ">

          <h1 className='font-bold text-gray-800'>Search Result For: <span className='font-normal text-gray-600'>{searchQuery}</span> </h1>
          

          {items && items.length > 0 ? (
            <section className="list-of-items grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
              {items.map((item) => (
                <Item key={item?.id} item={item} />
              ))}
            </section>
          ) : (
            <p className="text-gray-400">No items available for {searchQuery}</p>
          )}


        </div>

      </div>
      
      <Footer/>

    </div>
  )
}

export default SinglePage
