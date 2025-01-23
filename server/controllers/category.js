const Category = require('../models/Category');


const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const newCategory = new Category({
      name,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json({
      message: 'Category added successfully',
      category: savedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category deleted successfully',
      category: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

module.exports = { addCategory, deleteCategory, getCategories };