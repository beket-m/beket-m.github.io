// Changes background color when the button is clicked
const colorButton = document.getElementById('colorButton');
colorButton.addEventListener('click', () => {
    document.body.style.backgroundColor =
        document.body.style.backgroundColor === 'green' ? 'white' : 'green';
});

// Displays a greeting when text is entered
const nameInput = document.getElementById('nameInput');
const greetingMessage = document.getElementById('greetingMessage');

nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();
    if (name) {
        greetingMessage.textContent = `Hello, ${name}!`;
    } else {
        greetingMessage.textContent = '';
    }
});
