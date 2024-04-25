const { Router } = require('express');
const router = Router();
const { getUsers, populateDatabase } = require('../controllers/index.controller');
const { getUsers2, populateDatabase2 } = require('../controllers/app.controller');
const { prismaFunction } = require('../controllers/prisma.controller');

router.get('/', (req, res) => {
    res.send('Hello World');
});
router.get('/users', (req, res) => {
    getUsers(req, res)
});
router.post('/populate', async(req, res) => {
    await populateDatabase(req, res)
});

router.post('/populate/2', async(req, res) => {
    await populateDatabase2(req, res)
});

router.post('/prisma', async(req, res) => {
    await prismaFunction(req, res)
});

module.exports = router;