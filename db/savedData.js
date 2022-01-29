const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readNotes = util.promisify(fs.readFile);
const writeNotes = util.promisify(fs.writeFile);

class SavedData {
  write(note) {
    return writeNotes('db/db.json', JSON.stringify(note));
  }

  read() {
    return readNotes('db/db.json', 'utf8');
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error('You need a title and text!');
    }
    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  deleteNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id != id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new SavedData();
