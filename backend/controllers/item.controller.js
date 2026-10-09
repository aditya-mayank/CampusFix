const Item = require('../models/Item.model');
const { uploadToCloudinary } = require('../middleware/upload.middleware');

exports.reportLostItem = async (req, res) => {
  try {
    const { title, category, location, dateLost, description, visibility } = req.body;
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const newItem = new Item({
      title, category, location, dateLost, description, visibility, imageUrl,
      type: 'lost',
      user: req.user.id
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.reportFoundItem = async (req, res) => {
  try {
    const { title, category, location, dateFound, description } = req.body;
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const newItem = new Item({
      title, category, location, dateFound, description, imageUrl,
      visibility: 'private', // Enforced private
      type: 'found',
      user: req.user.id
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLostItems = async (req, res) => {
  try {
    const items = await Item.find({ type: 'lost', visibility: 'public' }).populate('user', 'name');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    
    // Prevent found items from being made public
    if (item.type === 'found' && req.body.visibility === 'public') {
       return res.status(400).json({ message: 'Found items must remain private' });
    }

    // Process new image if uploaded
    if (req.file) {
      req.body.imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await item.deleteOne(); // updated from remove()
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
