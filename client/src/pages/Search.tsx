import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Item from '../components/Item';
import Slider from '../components/Slider';

function SinglePage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  return (
    <div>
      
      <Header/>
      
      <div className='flex flex-col gap-3 text-green-950 px-20 py-5'>
        
        <Slider/>

        <div className="flex flex-col gap-8 px-20 py-5 mt-10 ">

          <h1 className='font-bold text-gray-800'>Search Result For: <span className='font-normal text-gray-600'>{searchQuery}</span> </h1>
          
          <section className="list-of-items grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </section>

        </div>

      </div>
      
      <Footer/>

    </div>
  )
}

export default SinglePage
