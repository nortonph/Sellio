import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    city: "",
    country: "",
    coverPhoto: null,
    images: [],
    videos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, field) => {
    if (field === "coverPhoto") {
      setFormData({ ...formData, coverPhoto: e.target.files[0] });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], ...e.target.files],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    // Send `formData` to your backend here.
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Add a New Item</h2>
        <button onClick={handleBackClick} className="text-blue-500 hover:underline">
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Category ID"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Cover Photo */}
        <div>
          <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">
            Cover Photo
          </label>
          <div className="relative">
            <input
              type="file"
              name="coverPhoto"
              id="coverPhoto"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "coverPhoto")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => document.getElementById("coverPhoto").click()}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Additional Images
          </label>
          <div className="relative">
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "images")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => document.getElementById("images").click()}
            >
              Upload
            </button>
          </div>
          
          {/* Display selected image names with a delete button */}
          <div className="mt-2">
            {formData.images.map((image, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{image.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updatedImages = formData.images.filter((_, idx) => idx !== index);
                    setFormData({ ...formData, images: updatedImages });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div>
          <label htmlFor="videos" className="block text-sm font-medium text-gray-700">
            Videos
          </label>
          <div className="relative">
            <input
              type="file"
              name="videos"
              id="videos"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, "videos")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => document.getElementById("videos").click()}
            >
              Upload
            </button>
          </div>

          {/* Display selected video names with a delete button */}
          <div className="mt-2">
            {formData.videos.map((video, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{video.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updatedVideos = formData.videos.filter((_, idx) => idx !== index);
                    setFormData({ ...formData, videos: updatedVideos });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
