let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

const showData = (element) => (element.style.display = 'inline');

const hideData = (element) => (element.style.display = 'none');

let currentNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const displayNotes = () => {
  hideData(saveNoteBtn);

  if (currentNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = currentNote.title;
    noteText.value = currentNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const noteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAnddisplayNotess();
    displayNotes();
  });
};

const noteDelete = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (currentNote.id === noteId) {
    currentNote = {};
  }

  deleteNote(noteId).then(() => {
    getAnddisplayNotess();
    displayNotes();
  });
};

const noteView = (e) => {
  e.preventDefault();
  currentNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  displayNotes();
};

const newNoteView = (e) => {
  currentNote = {};
  displayNotes();
};

const displaySaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hideData(saveNoteBtn);
  } else {
    showData(saveNoteBtn);
  }
};

const displayNotesList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', noteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', noteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

const getAnddisplayNotess = () => getNotes().then(displayNotesList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', noteSave);
  newNoteBtn.addEventListener('click', newNoteView);
  noteTitle.addEventListener('keyup', displaySaveBtn);
  noteText.addEventListener('keyup', displaySaveBtn);
}

getAnddisplayNotess();
