import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Items from '../components/Items';
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
        <Items/>

        </div>

      </div>
      
      <Footer/>

    </div>
  )
}

export default SinglePage
