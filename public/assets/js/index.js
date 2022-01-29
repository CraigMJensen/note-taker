let noteTitle = document.querySelector('.note-title');
let noteText = document.querySelector('.note-textarea');
let saveNoteBtn = document.querySelector('.save-note');
let newNoteBtn = document.querySelector('.new-note');
let noteList = document.querySelectorAll('.list-container .list-group');

const showData = (element) => (element.style.display = 'inline');

const hideData = (element) => (element.style.display = 'none');
