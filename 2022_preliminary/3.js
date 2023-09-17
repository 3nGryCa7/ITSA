const notes = JSON.parse(localStorage.getItem("notes")) || [];  // 筆記列表
const categories = JSON.parse(localStorage.getItem("categories")) || [];  // 分類列表

const categoryInput = document.getElementById("categoryInput");
const categoryList = document.getElementById("categoryList");

class note {
    constructor(catetory, title, content) {
        this.category = catetory;
        this.title = title;
        this.content = content;
    }
}


function addNote() {
    const note = new note();
    selectCategory(note);
    const title = document.getElementById("titleInput").value.trim();
    const content = document.getElementById("contentInput").value.trim();
    if (title && content) {
        notes.push(note);
        saveNotes();
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addCategory() {
    const text = categoryInput.value.trim();
    categories.array.forEach(element => {
        if (element == text) {
            return "分類已存在";
        }
    });
    categories.push(text);
    categoryInput.value = "";
    saveCategories();
}

function selectCategory(index, note) {
    note.catetory.push(categories[index]);
}


function getCategories() {
    return categories;
}

function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
}