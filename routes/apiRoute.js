const router = require('express').Router();

const savedData = require('../db/savedData');

// Get notes
router.get('/notes', (req, res) => {
  savedData
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

// Post notes
router.post('/notes', (req, res) => {
  savedData
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// Delete note
router.delete('/notes/:id', (req, res) => {
  savedData
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
