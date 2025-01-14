import { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Item from '../components/Item';
import NewestSlider from '../components/NewestSlider';
import Pagination from '../components/Pagination';
import Slider from '../components/Slider';
import { Item as ItemType } from '../types/Item';

function Home() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);


  // Fetch items from the server
  useEffect(() => {
    document.title = "Sellio";

    const link = document.querySelector("link[rel='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = "/assets/images/sellio-48.png"; 
    document.head.appendChild(link);

    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json(); 
        setItems(data.items);
        setTotalPages(data.totalPages);
        setItemsPerPage(data.itemsPerPage);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-3 px-20 py-5">
        <Slider />
        <Filters />

        <h1 className="font-bold mt-10">Second-hand Stuff for You!</h1>

          <section className="list-of-items grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">

            {items.map((item) => (
              <Item key={item?.id} item={item} />
            ))}
            
          </section>

          <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />

        <NewestSlider />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
