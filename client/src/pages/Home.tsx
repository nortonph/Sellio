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
  const [banners, setBanners] = useState<ItemType[]>([]);
  const [newest, setNewest] = useState<ItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    document.title = "Sellio";

    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link") as HTMLLinkElement;
    }
    link.rel = "icon";
    link.href = "/assets/images/sellio-48.png";
    if (!document.head.contains(link)) {
      document.head.appendChild(link);
    }

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

    const fetchBanners = async () => {
      try {
        const response = await fetch('http://localhost:3001/banners');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchNewest = async () => {
      try {
        const response = await fetch('http://localhost:3001/newest');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setNewest(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
    fetchBanners();
    fetchNewest();
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
        <Slider banners={banners} />
        <Filters />
        
        <h1 className="font-bold mt-10">Second-hand Stuff for You!</h1>

        <section className="list-of-items grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">

          {items && items.length > 0 ? (
              items.map((item) => (
                <Item key={item?._id} item={item} />
              ))
            ) : (
              <p>No items available.</p>
            )}
            
          </section>

          <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />

        <NewestSlider recentItems={newest} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
