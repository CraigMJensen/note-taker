const router = require('express').Router();
const fs = require('fs');

const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.get('/notes/:id', (req, res) => {
  res.json(notes);
});

// router.post('/api/notes', (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });

module.exports = router;
