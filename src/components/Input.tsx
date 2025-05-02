import { GlobalWorkerOptions } from "pdfjs-dist";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileCircleCheck, FaFileCircleXmark } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { useInputContext } from "../context/InputContext.tsx";
import { GetFileIcon } from "./getFileIcon.tsx";
import { extractTextFromFile } from "../utility/extractText.ts";
import { getImage, getSummary } from "../utility/api.ts";
import Loader from "./Loader.tsx";

const Input = ({ className }: { className?: string }) => {
  useEffect(() => {
    GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.mjs",
      import.meta.url,
    ).toString();
  }, []);

  const {
    setText,
    setExtractedText,
    setHasSubmitted,
    loading,
    setLoading,
    setSummary,
    setImgUrl,
  } = useInputContext();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [buttonText, setButtonText] = useState<string>("Submit");
  const [inputText, setInputText] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
        "text/plain": [".txt"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
      },
      maxFiles: 1,
    });

  const handleClick = async () => {
    setLoading(true);

    setButtonText("Submitting");

    setHasSubmitted(true);

    try {
      // States will give wrong value in async calls
      // Use variable to store state value instead of directly passing states as arguments.
      const currentText = inputText;
      let extractedFileText = "";

      setText(currentText);

      if (file) {
        setButtonText("Extracting text...");
        extractedFileText = await extractTextFromFile(file);
        setExtractedText(extractedFileText);
      }

      setButtonText("Summarizing...");
      const generatedSummary = await getSummary(currentText, extractedFileText);

      if (!generatedSummary) {
        throw new Error("Error fetching summary.");
      }

      setSummary(generatedSummary || "");

      const generatedImgBlob = await getImage(generatedSummary);

      if (generatedImgBlob) {
        const generatedImgUrl = URL.createObjectURL(generatedImgBlob);
        setImgUrl(generatedImgUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setButtonText("Submit");
      setLoading(false);
      setHasSubmitted(false);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setInputText(text);
  };

  return (
    <section className=" flex flex-col">
      <div
        {...getRootProps()}
        className={`${className} ${isDragReject && `border-red-500 border-4`} ${isDragAccept && `border-green-500`} flex flex-col gap-2 items-center justify-center border-2 border-dashed rounded-lg p-8  transition-all border-b-0 rounded-b-none`}
      >
        <input {...getInputProps()} disabled={isDragAccept} />
        <p className="italic text-xl">
          Upload a document to start summarizing...
        </p>
        {isDragReject && <FaFileCircleXmark size={80} />}
        {isDragAccept && <FaFileCircleCheck size={80} />}
        {!file && !isDragReject && !isDragAccept && <FaFileUpload size={80} />}
        {file && !isDragReject && !isDragAccept && (
          <GetFileIcon fileName={file.name} />
        )}

        {file ? (
          <p className="p-2 rounded-md bg-gray-200 font-source-code-pro-400">
            {file.name}
          </p>
        ) : (
          <p className="opacity-50">.docx .pdf .txt</p>
        )}

        {isDragReject && (
          <p className="text-red-500 font-bold">
            This file type is not compatible.
          </p>
        )}
      </div>
      <textarea
        className="min-w-[80vw] outline-none bg-gray-200 p-2 field-sizing-content max-h-[150vh] placeholder:text-xl placeholder:opacity-100 border-2 border-b-0 border-t-0 border-dashed"
        placeholder="Or Write Your Text Here"
        onChange={handleTextChange}
      />

      <button
        className={`${file ? `bg-green-400 border-blue-500 border-2` : `border-2 border-blue-500`} rounded-lg rounded-t-none cursor-pointer text-xl ${!loading && `hover:text-2xl`} active:text-xl p-2 transition-all flex items-center justify-center`}
        disabled={loading}
        onClick={handleClick}
      >
        {loading && <Loader className="w-12"/>}
        {buttonText}
      </button>
    </section>
  );
};

export default Input;
