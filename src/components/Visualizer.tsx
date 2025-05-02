import { useInputContext } from "../context/InputContext.tsx";
import Loader from "./Loader.tsx";
import { FaCopy } from "react-icons/fa";

const Visualizer = () => {
  const { imgUrl, loading } = useInputContext();

  const copyImageToClipboard = async () => {
    if (!imgUrl) return;
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      console.log("Image copied to clipboard");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="min-w-[80vw] flex flex-col items-center justify-center ">
      <div className="flex justify-between p-2 bg-gray-400/70 max-w-[80%] min-w-[80vw] rounded-lg rounded-b-none">
        <h1 className="text-3xl text-center w-full">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader className="w-12" />
              <p>Visualizing</p>
            </div>
          ) : (
            "Visualize"
          )}
        </h1>

        {imgUrl && (
          <button
            onClick={copyImageToClipboard}
            className="border-2 p-2 rounded-lg border-gray-500"
          >
            <FaCopy opacity={80} />
          </button>
        )}
      </div>

      <div className="p-4 bg-gray-300 max-w-[80%] min-w-[80vw] rounded-lg rounded-t-none flex flex-col items-center justify-center">
        {imgUrl ? (
          <div className="flex flex-col items-center">
            <img src={imgUrl} alt="Generated image" />
          </div>
        ) : (
          "Upload a document or write something to start generating image"
        )}
      </div>
    </section>
  );
};

export default Visualizer;
