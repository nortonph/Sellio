import { useNavigate } from 'react-router-dom';
import { Item as ItemType } from '../types/Item';
interface SliderProps {
  recentItems: ItemType[];
}

function NewestSlider({ recentItems }: SliderProps) {
  const navigate = useNavigate();
  const url = 'http://localhost:3001';

  const handleButtonClick = (id: string) => {
    navigate(`/item/${id}`);
  };

  return (
    <section>
      <h1 className='font-bold my-5'>The Latest Items</h1>

      <div className="list-of-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 my-5">

        {recentItems?.length > 0 ? (
          recentItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-200 rounded-lg shadow-md p-4 h-full"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              {/* Picture */}
              <img
                src={`${url}/${item.coverPhoto}`}
                alt={item.title}
                className="w-full h-36 object-cover mb-2 rounded-md"
              />

              {/* Title */}
              <h2 className="font-semibold text-lg text-gray-700">{item.title}</h2>

              {/* Price and Button */}
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-gray-800">${item.price}</span>
                <button
                  onClick={() => handleButtonClick(item._id)}
                  className="text-gray-600 px-2 py-1 rounded-full border border-gray-300 bg-white hover:border-0 hover:bg-green-900 hover:text-white"
                >
                  See Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No items available</div>
        )}
      </div>

    </section>
  );
}

export default NewestSlider;