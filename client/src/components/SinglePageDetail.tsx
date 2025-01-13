function SinglePageDetail(){
  return (
    <>
      <h1 className="text-3xl font-bold mb-3">2 Months used kitchen cabinets</h1>

      <div className="text-2xl font-semibold text-green-900 mb-5">$1000</div>

      <div className="mb-5">
        <p className="text-sm text-gray-600">
          <span className="font-bold">Category:</span> Kitchen
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">City:</span> Berlin
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Country:</span> Germany
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5">
        <h2 className="font-semibold text-lg mb-2">Contact Seller</h2>
        <p className="text-sm text-gray-600">Phone: +123456789</p>
        <p className="text-sm text-gray-600">Email: seller@example.com</p>
      </div>

      <button
        onClick={() => window.location.href = '/chat'}
        className="w-full py-3 text-white bg-green-900 rounded-lg shadow-md hover:bg-green-800"
      >
        Go to Chat
      </button>
    </>
  );
}


export default SinglePageDetail