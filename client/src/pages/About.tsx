import Header from '../components/Header';
import {Facebook, Instagram, Youtube} from 'lucide-react';

type Props = {}

const About = (props: Props) => {
  const url = 'http://localhost:3001';
  return (
    
  <div className='h-screen flex flex-col relative justify-center'> 
  <Header />
      <div className="min-h-64 bg-white"></div>
      <div className="flex-grow bg-[#14532D] relative"></div>
    <div className="flex justify-center text-center absolute items-center">
      <div className="w-1/2">
          <img src={`${url}/uploads/images/telework.jpg`} alt="about us" className="w-100" />
      </div>
      <div className="w-1/2 mt-64 text-white">
         <h1 className="sm:text-[50px] md:text-[150px] lg:text-[50px] font-semibold">Who Are We ?</h1>
         <div className='text-left m-5'>
         <p className="text-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ratione quae eum ex voluptate impedit.</p>
         <p className="text-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ipsum possimus
           repellendus ad nam accusamus assumenda ducimus veritatis officia eius?
          Nisi ratione quae eum ex voluptate impedit.</p>
         </div>
         <div className='text-left m-5 '>
          <p className="text-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ipsum possimus
            </p>
         </div>
         <div className="flex flex-col justify-center items-center space-y-5 w-96 text-center mx-auto">
          <h2 className="text-[20px] font-bold">Follow Us</h2>
          <div className='flex space-x-4'>
            <Instagram></Instagram>
            <Facebook></Facebook>
            <Youtube></Youtube>
          </div>
           
         </div>
      </div> 
    </div>
    <div className="flex flex-row items-center justify-center m-10 text-green-950 ">
        <p>©2025 sellio.com, Inc. </p>
    </div>
  </div>
  )
}

export default About