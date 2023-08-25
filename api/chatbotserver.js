const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 3000;

const chatbotProcess = spawn('/home/nyto/Images/chatbot/alpaca.cpp/chatserver/chat');

app.use(bodyParser.json());
app.use(cors());


app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Listen for chatbot responses and send them to the client in real time
    chatbotProcess.stdout.on('data', data => {
        const response = data.toString();
        res.write(`data: ${response}\n\n`); // Send the response as a chunk
    });

    chatbotProcess.stderr.on('data', errData => {
        console.error(errData.toString());
        // res.write(`data: An error occurred during chatbot processing.\n\n`);
    });

    // Listen for the 'close' event to finalize the response
    chatbotProcess.on('close', () => {
        res.end();
    });
});

app.post('/send', (req, res) => {
	console.log(req.body)
    const userMessage = req.body.message;

    // Send user input to chatbot process's standard input
    chatbotProcess.stdin.write(userMessage + '\n');

    res.status(200).json({ message: 'User input sent to chatbot' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});