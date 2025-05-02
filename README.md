# Summarize & Visualize

This React project allows users to upload documents (PDF, DOCX, TXT), extract the text, then generate a summarized version of the text and a related image for visualization. The application uses TypeScript, JavaScript, and various npm packages like `react-dropzone`, `pdfjs-dist`, `mammoth`, & `react-markdown`.

## Features

- Upload files or enter text manually.
- Extract text from PDF, DOCX, and TXT files.
- Summarize the text using a language model from Hugging Face.
- Generate an image based on the summary.
- Visualize both the summary and generated image in a responsive UI.

## Technologies

- TypeScript / JavaScript
- React
- Tailwind CSS
- npm

## Installation

1. Clone the repository.
2. Run:
   ```bash
   npm install
   ```

Create a .env file using your Hugging Face API key:
VITE_HUGGINGFACE_API_KEY=your_api_key_here
Usage
To start the development server:

Run:
   ```bash
      npm install
   ```