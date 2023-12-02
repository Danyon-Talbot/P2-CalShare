const router = require('express').Router();
const { Availabilty } = require('../../models');

router.get('/', async (req, res) => {
    res.render('all');
  });