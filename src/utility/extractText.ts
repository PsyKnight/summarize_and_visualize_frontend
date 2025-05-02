import { getDocument } from "pdfjs-dist";
import mammoth from "mammoth";
import { getFileExtension } from "./getFileExtension.ts";

export const extractTextFromFile = async (file: File) => {
  const extension = getFileExtension(file?.name);

  if (extension === "pdf") {
    return (await extractTextFromPdf(file)) as string;
  } else if (extension === "docx") {
    return (await extractTextFromDoc(file)) as string;
  } else if (extension === "txt") {
    return (await extractTextFromTxt(file)) as string;
  }

  return "";
};

export const extractTextFromPdf = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  let textContent = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    // @ts-ignore
    const strings = content.items.map((item) => item.str);
    textContent += strings.join(" ") + " ";
  }

  return textContent;
};

export const extractTextFromDoc = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export const extractTextFromTxt = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;
      resolve(text);
    };

    reader.onerror = (error) => {
      console.error("Error reading the text file:", error);
      reject("Failed to read file");
    };

    reader.readAsText(file);
  });
};
