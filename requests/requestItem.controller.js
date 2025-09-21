// requests/requestItem.controller.js
const express = require('express');
const router = express.Router();
const db = require('_helpers/db');

// Create a request item
router.post('/', async (req, res, next) => {
    try {
        const item = await db.RequestItem.create(req.body);
        res.json(item);
    } catch (err) {
        next(err);
    }
});

// Get all items
router.get('/', async (req, res, next) => {
    try {
        const items = await db.RequestItem.findAll();
        res.json(items);
    } catch (err) {
        next(err);
    }
});

module.exports = router;



