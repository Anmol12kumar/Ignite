require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in .env file');
}

module.exports = apiKey;

main();