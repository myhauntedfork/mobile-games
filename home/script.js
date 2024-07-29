document.addEventListener('DOMContentLoaded', () => {
    const toggleInput = document.querySelector('#theme-switch input');

    toggleInput.addEventListener('change', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Load theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        toggleInput.checked = savedTheme === 'dark';
    }
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggleInput.checked = savedTheme === 'dark';
}
