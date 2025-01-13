function Footer(){
  return (
    <>
      <section className='footer grid grid-cols-3 mx-10 mb-20'>
        <div className="category flex flex-col flex-wrap text-xs text-green-900">
          <h1 className='font-bold my-5 text-lg text-green-950'>COMPANY</h1>
          <span className='p-1 hover:text-green-950  cursor-pointer'>About us</span>
          <span className='p-1 hover:text-green-950  cursor-pointer'>FAQs</span>

        </div>

        <div className="category flex flex-col flex-wrap text-xs text-green-900">
          <h1 className='font-bold my-5 text-lg text-green-950'>CONTACT US</h1>
          <span className='p-1 hover:text-green-950  cursor-pointer'>+1234567890</span>
          <span className='p-1 hover:text-green-950  cursor-pointer'>info@sellio.com</span>

        </div>

        <div className="category flex flex-col flex-wrap text-xs text-green-900">
          <h1 className='font-bold my-5 text-lg text-green-950'>COMPLAIN</h1>
          <div className='flex items-center border-b border-gray-300'>
            <input 
            type="text" 
            className="flex-grow bg-transparent py-3 outline-none text-gray-700 placeholder-gray-500 " 
            placeholder='enter your complain here...'/>
            <button className=" text-green-900 px-3 py-1 rounded hover:text-green-950">
                Submit
              </button>
          </div>

        </div>
            
      </section>

      <div className="border-b border border-dotted border-green-900 mx-20 mt-20"></div>

      <div className="flex flex-row items-center justify-center m-10 text-green-950 ">
        <p>©2025 sellio.com, Inc. </p>
      </div>
    </>
  );
}



export default Footer;