const outputDiv = document.getElementById('output');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', async () => {
  const message = userInput.value;
  userInput.value = '';

  outputDiv.innerHTML += `<h3>User:</h3><p>${message}</p><h3>Chatbot:</h3>`;

  const response = await fetch('http://192.168.1.48:3000/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (response.status === 200) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      outputDiv.innerHTML += chunk
//       for (const line of lines) {
//         if (line.trim()) {
//           // outputDiv.innerHTML += line.replace(/\\x1B\\\[\[0-9;\]\*\[JKmsu\]/g, '').replace(/\\x1b\\\[\[0-9;\]\*m/g, '') + '<br>';
// 		outputDiv.innerHTML += line.trim()
//         }
//       }
    }
  } else {
    outputDiv.innerHTML += 'An error occurred during chatbot processing.<br>';
  }
});
