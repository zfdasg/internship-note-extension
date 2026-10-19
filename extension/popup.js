const note = document.querySelector('#note');
const status = document.querySelector('#status');
const key = 'simple-note-content';
try { note.value = localStorage.getItem(key) || ''; }
catch { status.textContent = '无法读取本地存储。'; }
document.querySelector('#save').addEventListener('click', () => {
  try {
    localStorage.setItem(key, note.value);
    status.textContent = '已保存！下次打开仍可查看。';
  } catch { status.textContent = '保存失败，请检查浏览器存储设置。'; }
});
document.querySelector('#clear').addEventListener('click', () => {
  try {
    localStorage.removeItem(key);
    note.value = '';
    status.textContent = '已清空。';
    note.focus();
  } catch { status.textContent = '清空失败，请重试。'; }
});
