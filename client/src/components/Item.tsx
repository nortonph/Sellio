import { useNavigate } from 'react-router-dom';

function Item(){
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/item');
  };

  return (
    <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md p-4">
      <img
        src="https://i.ebayimg.com/images/g/b5YAAOSwqnFnZ8Qs/s-l1600.webp"
        alt=""
        className="max-w-36 object-cover mb-2"
      />
      <h2 className="title font-semibold text-gray-700 text-lg">Acoustic guitar</h2>
      <p className="text-sm text-gray-500 mb-2">Berlin, Germany</p>
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-gray-800">$89.99</span>

        <button onClick={handleButtonClick} className="text-gray-600 px-3 py-1 rounded-full border border-gray-300 bg-white hover:border-0 hover:bg-green-900 hover:text-white">
          See Detail
        </button>
      </div>
    </div>
  );
}

export default Item;