const { Ollama } = require('ollama-node');

const ollama = new Ollama("llama2");
// ollama.setModel

// callback to print each word 
const print = (word) => {
  process.stdout.write(word);
}
ollama.streamingGenerate("why is the sky blue", print);

