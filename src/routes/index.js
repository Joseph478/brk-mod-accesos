const { Router } = require('express');
const router = Router();
const { getUsers } = require('../controllers/index.controller');

router.get('/', (req, res) => {
    res.send('Hello World');
});
router.get('/users', (req, res) => {
    getUsers(req, res)
});

module.exports = router;