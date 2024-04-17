const { Router } = require('express');
const router = Router();
const { getUsers, populateDatabase } = require('../controllers/index.controller');

router.get('/', (req, res) => {
    res.send('Hello World');
});
router.get('/users', (req, res) => {
    getUsers(req, res)
});
router.get('/populate', async(req, res) => {
    await populateDatabase(req, res)
});

module.exports = router;