// Sahifalarni almashtirish
function showPage(page) {
    document.querySelectorAll('.page').forEach(item => {
        item.classList.add('hidden');
    });

    document.getElementById(page).classList.remove('hidden');

    document.querySelectorAll('.nav').forEach(item => {
        item.classList.remove('active');
    });

    const active = document.querySelector(`.nav[data-page="${page}"]`);

    if (active) active.classList.add('active');

    const titles = {
        home: 'Bosh sahifa',
        ai: 'AI yordamchi',
        notes: 'Konspekt',
        tests: 'Testlar',
        schedule: 'Dars jadvali'
    };

    document.getElementById('page-title').textContent = titles[page];
}

document.querySelectorAll('.nav').forEach(button => {
    button.addEventListener('click', () => {
        showPage(button.dataset.page);
    });
});


// AI yordamchi (hozircha demo rejim)
function askAI() {
    const question = document.getElementById('ai-question').value.trim();
    const answer = document.getElementById('ai-answer');

    if (!question) {
        answer.textContent = 'Iltimos, avval savol yozing.';
        return;
    }

    answer.textContent = 'Savolingiz: ' + question +
        '\n\nBu hozircha demo rejim. Haqiqiy AI javoblari uchun backend va AI API ulanishi kerak.';
}


// Konspekt saqlash
let notes = JSON.parse(localStorage.getItem('talabaNotes')) || [];

function renderNotes() {
    const list = document.getElementById('notes-list');
    list.innerHTML = '';

    notes.forEach((note, index) => {
        const item = document.createElement('div');
        item.className = 'saved-item';

        const content = document.createElement('div');
        const title = document.createElement('b');
        const description = document.createElement('p');

        title.textContent = note.title;
        description.textContent = note.text;

        content.append(title, description);

        const remove = document.createElement('button');
        remove.textContent = 'O‘chirish';
        remove.onclick = () => deleteNote(index);

        item.append(content, remove);
        list.appendChild(item);
    });
}

function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    const text = document.getElementById('note-text').value.trim();

    if (!title || !text) {
        alert('Mavzu va matnni to‘ldiring!');
        return;
    }

    notes.push({ title, text });

    localStorage.setItem('talabaNotes', JSON.stringify(notes));

    document.getElementById('note-title').value = '';
    document.getElementById('note-text').value = '';

    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('talabaNotes', JSON.stringify(notes));
    renderNotes();
}


// Test tizimi
function checkAnswer(button, correct) {
    const result = document.getElementById('test-result');

    document.querySelectorAll('.options button').forEach(item => {
        item.style.borderColor = '#e4e7ef';
    });

    if (correct) {
        result.textContent = 'To‘g‘ri javob! Barakalla.';
        result.style.color = '#16a34a';
        button.style.borderColor = '#16a34a';
    } else {
        result.textContent = 'Noto‘g‘ri javob. Yana urinib ko‘ring.';
        result.style.color = '#dc2626';
        button.style.borderColor = '#dc2626';
    }
}


// Dars jadvali
let lessons = JSON.parse(localStorage.getItem('talabaLessons')) || [];

function renderLessons() {
    const list = document.getElementById('lesson-list');
    list.innerHTML = '';

    lessons.forEach((lesson, index) => {
        const item = document.createElement('div');
        item.className = 'saved-item';

        const content = document.createElement('div');
        const title = document.createElement('b');
        const time = document.createElement('p');

        title.textContent = lesson.name;
        time.textContent = lesson.time;

        content.append(title, time);const remove = document.createElement('button');
        remove.textContent = 'O‘chirish';
        remove.onclick = () => deleteLesson(index);

        item.append(content, remove);
        list.appendChild(item);
    });
}

function addLesson() {
    const name = document.getElementById('lesson-name').value.trim();
    const time = document.getElementById('lesson-time').value;

    if (!name || !time) {
        alert('Dars nomi va vaqtini kiriting!');
        return;
    }

    lessons.push({ name, time });

    localStorage.setItem('talabaLessons', JSON.stringify(lessons));

    document.getElementById('lesson-name').value = '';
    document.getElementById('lesson-time').value = '';

    renderLessons();
}

function deleteLesson(index) {
    lessons.splice(index, 1);
    localStorage.setItem('talabaLessons', JSON.stringify(lessons));
    renderLessons();
}


// Sahifa ochilganda saqlangan ma'lumotlarni chiqarish
renderNotes();
renderLessons();