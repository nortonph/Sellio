function Filters(){
  return (
    <section className='list-of-items flex flex-row gap-3 mt-10'>
      <div className='flex flex-row items-center bg-gray-200 px-4 py-1 rounded-full hover:bg-gray-300 cursor-pointer'>
        <span>Categories</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
      <div className='flex flex-row items-center bg-gray-200 px-4 py-1 rounded-full hover:bg-gray-300 cursor-pointer'>
        <span>Price Range</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
      <div className='flex flex-row items-center bg-gray-200 px-4 py-1 rounded-full hover:bg-gray-300 cursor-pointer'>
        <span>Country</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
      <div className='flex flex-row items-center bg-gray-200 px-4 py-1 rounded-full hover:bg-gray-300 cursor-pointer'>
        <span>City</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>

      <div className='flex flex-row ml-auto items-center border border-gray-200 px-4 py-1 rounded-full hover:border-gray-300 cursor-pointer'>
        <span>Sort By</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
    </section>

  );
}



export default Filters;