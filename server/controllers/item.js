const Item = require('../models/item');

const getOne = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(200).send(item); 
  } catch (error) {
    res.status(500).send({ message: 'Error fetching item', error });
  }
};



const getAll = async (req, res) => {
  try {
    const items = await Item.find();
    
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching items', error });
  }
};

const getFilteredItems = async (req, res) => {}
const addItem = async (req, res) => {}
const updateItem = async (req, res) => {}
const uploadMedia = async (req, res) => {}
const getSoldItems = async (req, res) => {}
const getboughtItems = async (req, res) => {}
const getItemsWaitingForSell = async (req, res) => {}
const deleteItem = async (req, res) => {}
const getAllItems = async (req, res) => {}

module.exports = { getAll, getOne , addItem, updateItem, uploadMedia, getSoldItems, getboughtItems, getItemsWaitingForSell, deleteItem, getAllItems, getFilteredItems };
