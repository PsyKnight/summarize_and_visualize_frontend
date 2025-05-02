import Markdown from "react-markdown";
import { useInputContext } from "../context/InputContext.tsx";
import Loader from "./Loader.tsx";
import { FaCopy } from "react-icons/fa";

const Summarizer = () => {
  const { summary, loading } = useInputContext();
  return (
    <section className="min-w-[80vw] flex flex-col items-center justify-center ">
      <div className="flex justify-between p-2 bg-gray-400/70 max-w-[80%] min-w-[80vw] rounded-lg rounded-b-none ">
        <h1 className="text-3xl text-center w-full">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader className="w-12" />
              <p>Summarizing</p>
            </div>
          ) : (
            "Summary"
          )}
        </h1>
        {summary && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(summary);
            }}
            className="border-2 p-2 rounded-lg border-gray-500"
          >
            <FaCopy opacity={80} />
          </button>
        )}
      </div>
      <div className="p-4 bg-gray-300 max-w-[80%] min-w-[80vw] rounded-lg rounded-t-none flex items-center justify-center">
        <Markdown>
          {summary
            ? summary
            : "Upload a document or write something to start generating summary."}
        </Markdown>
      </div>
    </section>
  );
};

export default Summarizer;
