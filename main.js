const fs = require('fs');
const pdf = require('pdf-parse');

// Read the PDF file
const dataBuffer = fs.readFileSync('American_Oxford_5000.pdf');

// Extract the text from the PDF file
pdf(dataBuffer).then(function(data) {
    // Split the text into lines
    const lines = data.text.split('\n');

    // Extract the words and clean up the extra text
    const words = [];
    for (let line of lines) {
        const match = line.match(/^([a-z\s-]+)\s+/i);
        if (match) {
            const word = match[1].trim();
            words.push(word);
        }
    }

    // Sort the list of words alphabetically
    words.sort();

    // Save the list of words as a JSON file
    const jsonWords = words.map(word => `"${word}"`).join(',\n');
    const jsonString = `[\n${jsonWords}\n]`;
    fs.writeFileSync('words.json', jsonString);
});
