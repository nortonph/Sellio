const Item = require('../models/item');
const fs = require('fs');
const path = require('path');

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(200).send(item); 
  } catch (error) {
    res.status(500).send({ message: 'Error fetching item', error });
  }
};

const getItems = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = 30;

    const items = await Item.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalItems = await Item.countDocuments();

    const totalPages = Math.ceil(totalItems / limitNumber);

    res.status(200).send({
      currentPage: pageNumber,
      totalPages,
      totalItems,
      itemsPerPage: limitNumber,
      items,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching items', error });
  }
};

const getFilteredItems = async (req, res) => {
  try {
    const { q, page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = 30;

    const filter = {};

    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }

    const items = await Item.find(filter)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalItems = await Item.countDocuments(filter);

    res.status(200).json({
      currentPage: pageNumber,
      totalPages: Math.ceil(totalItems / limitNumber),
      totalItems,
      items
    });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching filtered items', error });
  }
};

const userItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Item.find({userId : userId}).exec();
  
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching items', error });
  }
};

const getNewestItem = async (req, res) => {
  try {
    const limitNumber = 6;

    const items = await Item.find()
      .limit(limitNumber);

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching items', error });
  }
};

const getBannerItems = async (req, res) => {
  try {
    
    const items = await Item.find({ isBanner: true });

    res.status(200).send(items);

  } catch (error) {
    res.status(500).send({ message: 'Error fetching items', error });
  }
};

const addItem = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).send({ message: 'User ID is required' });
    }

    const newItem = new Item({
      ...req.body,
      userId,
    });

    await newItem.save();
    res.status(201).send({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    res.status(500).send({ message: 'Error adding item', error });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(200).send({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).send({ message: 'Error updating item', error });
  }
};

const uploadMedia = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.files || !req.files.media) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const file = req.files.media;

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedVideoTypes = ['video/mp4'];

    const isImage = allowedImageTypes.includes(file.mimetype);
    const isVideo = allowedVideoTypes.includes(file.mimetype);

    if (!isImage && !isVideo) {
      return res.status(400).send({ message: 'Invalid file type. Only images and videos are allowed.' });
    }

    const folder = isImage ? 'uploads/images' : 'uploads/videos';
    const uploadPath = path.join(__dirname, '..', folder);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadPath, fileName);

    file.mv(filePath, (err) => {
      if (err) {
        return res.status(500).send({ message: 'Error saving file', error: err });
      }

      const fileUrl = `/uploads/${isImage ? 'images' : 'videos'}/${fileName}`;
      res.status(200).send({ message: 'File uploaded successfully', url:fileUrl });
    });
  } catch (error) {
    res.status(500).send({ message: 'Error uploading file', error });
  }
};

const getUserSoldItems = async (req, res) => {
  try {
    const user = req.user;
    const { page = 1 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = 30;

    const items = await Item.find({ isSold: true, userId: user._id })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalItems = await Item.countDocuments({ isSold: true, userId: user._id  });
    const totalPages = Math.ceil(totalItems / limitNumber);

    res.status(200).send({
      currentPage: pageNumber,
      totalPages,
      totalItems,
      itemsPerPage: limitNumber,
      items,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching sold items', error });
  }
};

const getUserItemsWaitingForSell = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = 30;

    const items = await Item.find({ isSold: false, userId: userId })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalItems = await Item.countDocuments({ isSold: false, isBanner: false });
    const totalPages = Math.ceil(totalItems / limitNumber);

    res.status(200).send({
      currentPage: pageNumber,
      totalPages,
      totalItems,
      itemsPerPage: limitNumber,
      items,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching items waiting for sell', error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).send({ message: 'Item not found' });
    }

    res.status(200).send({ message: 'Item deleted successfully', item: deletedItem });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting item', error });
  }
};



module.exports = { getItems, getItem, userItems,getBannerItems, getNewestItem, addItem, getFilteredItems, updateItem, uploadMedia, getUserSoldItems, getUserItemsWaitingForSell, deleteItem };