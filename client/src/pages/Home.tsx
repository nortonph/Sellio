import { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Item from '../components/Item';
import NewestSlider from '../components/NewestSlider';
import Pagination from '../components/Pagination';
import Slider from '../components/Slider';
import type { Item as ItemType } from '../types/Item';

import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [banners, setBanners] = useState<ItemType[]>([]);
  const [newest, setNewest] = useState<ItemType[]>([]);
  const [pageData, setPageData] = useState({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 21,
  });


  useEffect(() => {
    document.title = "Sellio";

    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });

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
      console.log("Fetching new Page: ", pageData);
      try {
        
        const response = await fetch(`http://localhost:3001/?page=${pageData.currentPage}&limit=${pageData.itemsPerPage || 10}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data.items);
        setPageData((prev) => ({
          ...prev,
          totalPages: data.totalPages,
        }));
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
  }, [pageData.currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pageData.totalPages) {
      pageData.currentPage = newPage;
      setPageData((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-3 px-20 py-5" data-aos="fade">
        <Slider banners={banners} />
        <Filters />
        
        <h1 className="font-bold mt-10" data-aos="fade">Second-hand Stuff for You!</h1>

        <section className="list-of-items grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">

          {items && items.length > 0 ? (
              items.map((item, index) => (
                <Item key={item?._id} item={item} delay={index * 100}/>
              ))
            ) : (
              <p>No items available.</p>
            )}
            
          </section>

          <Pagination totalPages={pageData.totalPages} handlePageChange={handlePageChange} />

        <NewestSlider recentItems={newest} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
