const outputDiv = document.getElementById('output');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

const eventSource = new EventSource('http://127.0.0.1:3000/stream');

eventSource.onmessage = event => {
    const response = event.data;
    outputDiv.innerHTML += response 
    .replace(/\x1B\[[0-9;]*[JKmsu]/g, ''); // ansi escape codes
    // .replace(/\x1b\[[0-9;]*m/g, '');
    // + '<br>';
};

sendButton.addEventListener('click', () => {
    const message = userInput.value;
    userInput.value = '';
    fetch('http://127.0.0.1:3000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'message' : message })
    });
    outputDiv.innerHTML += `<h3>User: </h3><p>${message}</p><h3>Chatbot: </h3>`;
});