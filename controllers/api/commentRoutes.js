const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
