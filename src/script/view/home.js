import Utils from '../components/utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteQueryWaitingElement = document.querySelector('query-waiting');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const showNotes = () => {
    showQueryWaiting();
    const result = Notes.getAll();
    displayResult(result);
    showNoteList();
  };

  const displayResult = (notes) => {
    const blankNote = {}; 
    const notesWBlank = [...notes, blankNote];
    const noteItemElements = notesWBlank.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
    
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };


  const showQueryWaiting = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteQueryWaitingElement);
  };
  showNotes();
};

export default home;
