// Switching between Notepad and List View
const notepadSection = document.getElementById('notepad-section');
const listSection = document.getElementById('list-section');

document.getElementById('show-notepad').addEventListener('click', () => {
    notepadSection.style.display = 'block';
    listSection.style.display = 'none';
});

document.getElementById('show-list').addEventListener('click', () => {
    notepadSection.style.display = 'none';
    listSection.style.display = 'block';
});

// Handling Notes
let notesArray = []; // Placeholder array to hold notes

document.getElementById('save-note').addEventListener('click', () => {
    const noteText = document.getElementById('note-text').value;
    if (noteText.trim()) {
        notesArray.push(noteText); // Add note to array
        updateNotesList();
        document.getElementById('note-text').value = ''; // Clear the textarea after saving
    }
});

document.getElementById('clear-note').addEventListener('click', () => {
    document.getElementById('note-text').value = ''; // Clear the textarea
});

// Function to update the list of notes
function updateNotesList() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // Clear the list
    notesArray.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.textContent = note;
        notesList.appendChild(noteItem);
    });
}
