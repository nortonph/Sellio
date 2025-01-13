function Item(){
  return (
    <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow-md p-4">
      <img
        src="https://i.ebayimg.com/images/g/b5YAAOSwqnFnZ8Qs/s-l1600.webp"
        alt=""
        className="max-w-36 object-cover mb-2"
      />
      <h2 className="title font-semibold text-lg">Acoustic guitar</h2>
      <p className="text-sm text-gray-500 mb-2">Berlin, Germany</p>
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-green-900">$89.99</span>
        <button className="bg-green-900 text-white px-3 py-1 rounded hover:bg-green-700">
          See Detail
        </button>
      </div>
    </div>
  );
}

export default Item;