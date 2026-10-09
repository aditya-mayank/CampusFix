const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');

router.post('/lost', authMiddleware, upload.single('image'), itemController.reportLostItem);
router.post('/found', authMiddleware, upload.single('image'), itemController.reportFoundItem);

router.get('/lost', itemController.getLostItems);
router.get('/my-items', authMiddleware, itemController.getMyItems);

router.put('/:id', authMiddleware, upload.single('image'), itemController.updateItem);
router.delete('/:id', authMiddleware, itemController.deleteItem);

module.exports = router;
