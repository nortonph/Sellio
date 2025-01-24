import { useNavigate } from 'react-router-dom';
import { Item as ItemType } from '../types/Item';

interface ItemProps {
  item: ItemType;
  delay: number;
}

function Item({ item, delay }: ItemProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/item/${item._id}`); 
  };
  const url = 'http://localhost:3001'

  return (
    <div
      className="flex flex-col border border-gray-200 rounded-lg shadow-md p-4 h-full"
      data-aos="fade-up"
      data-aos-delay={`${delay}`}
    >
      {/* Picture */}
      <img
        src={`${url}/${item.coverPhoto}`}
        alt={item.title}
        className="w-full h-36 object-cover mb-2 rounded-md"
      />

      {/* Title */}
      <h2 className="font-semibold text-gray-700 text-lg">{item.title}</h2>

      {/* Location */}
      <p className="text-sm text-gray-500 flex-grow mb-2">
        {item.city && item.country ? `${item.city}, ${item.country}` : 'Location not available'}
      </p>

      {/* Price and Button */}
      <div className="flex justify-between items-center mt-auto">
        <span className="font-bold text-gray-800">${item.price}</span>
        <button
          onClick={handleButtonClick}
          className="text-gray-600 px-2 py-1 rounded-full border border-gray-300 bg-white hover:border-0 hover:bg-green-900 hover:text-white"
        >
          See Detail
        </button>
      </div>
    </div>
  );
}

export default Item;
