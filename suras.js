// Simple loader for local data/suras/1.json and renders Al-Fatiha
async function loadSurah(n){
const res = await fetch(`data/suras/${n}.json`);
const data = await res.json();
renderSurah(data);
}


function renderSurah(surah){
const container = document.getElementById('ayah-list');
container.innerHTML = '';
const template = document.getElementById('ayah-template');


surah.ayahs.forEach(a => {
const node = template.content.cloneNode(true);
node.querySelector('.ayah-number').textContent = a.ayah_number;
node.querySelector('.arabic-line').textContent = a.text_ar;


const wordList = node.querySelector('.word-list');
a.words.forEach(w => {
const div = document.createElement('div');
div.className = 'word-item';
div.innerHTML = `
<div class="word-token">${w.token}</div>
<div class="word-meta">
<div>Root: <strong>${w.root||'-'}</strong></div>
<div>Bangla: ${w.bangla_meaning||'-'}</div>
<div>POS: ${w.pos||'-'}</div>
<div class="grammar">${w.grammar_note_bangla||''}</div>
</div>`;
wordList.appendChild(div);
});


node.querySelector('.ayah-note').textContent = a.ayah_note_bangla || '';
container.appendChild(node);
});
}


// init
window.addEventListener('DOMContentLoaded',()=>{
const sel = document.getElementById('surah');
sel.addEventListener('change', e=> loadSurah(e.target.value));
loadSurah(sel.value);
});
