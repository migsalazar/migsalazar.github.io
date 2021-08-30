function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem('theme', theme);
  document.getElementById("theme-toggle").classList.remove('sun', 'moon');
  document.getElementById("theme-toggle").classList.add(theme === "dark" ? 'sun' : 'moon');
}

let theme = localStorage.getItem('theme');
theme = theme || (window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light');

setTheme(theme);

function modeSwitcher() {
  let newMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light': 'dark';
  setTheme(newMode);
}

