import { Item as ItemType } from '../types/Item';
interface SliderProps {
  recentItems: ItemType[]; 
}

function NewestSlider({recentItems} : SliderProps) {
  const url = 'http://localhost:3001';
  return (
    <section>
            <h1 className='font-bold my-5'>The Latest Items</h1>

            <div className="list-of-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 my-5">

                {recentItems?.length > 0 ? (
                  recentItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md p-4 cursor-pointer hover:border-gray-300" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                    <img
                      src={`${url}/${item.coverPhoto}`}
                      alt=""
                      className="max-w-36 object-cover mb-2"
                    />
                    <h2 className="title font-semibold text-lg">{item.title}</h2>
                    <div className="flex justify-between items-center w-full">
                      
                    </div>
                  </div>
                  ))
                ) : (
                  <div ></div>
                )}
            </div>
            
    </section>
  );
}

export default NewestSlider;