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
    <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md p-4" data-aos="fade-up" data-aos-delay={`${delay}`}>
      <img
        src={`${url}/${item.coverPhoto}`}
        alt={item.title}
        className="max-w-36 object-cover mb-2"
      />
      <h2 className="title font-semibold text-gray-700 text-lg">{item.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        {item.city && item.country ? `${item.city}, ${item.country}` : 'Location not available'}
      </p>
      <div className="flex justify-between items-center w-full">
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
