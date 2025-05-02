import Markdown from "react-markdown";
import { useInputContext } from "../context/InputContext.tsx";
import Loader from "./Loader.tsx";

const Summarizer = () => {
  const { summary, loading } = useInputContext();
  return (
    <section className="min-w-[80vw] flex flex-col items-center justify-center ">
      <h1 className="text-3xl p-2 bg-gray-400/70 max-w-[80%] min-w-[80vw] rounded-lg rounded-b-none text-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader className="w-12" />
            <p>Generating image...</p>
          </div>
        ) : (
          "Summary"
        )}
      </h1>
      <div className="p-4 bg-gray-300 max-w-[80%] min-w-[80vw] rounded-lg rounded-t-none">
        <Markdown>
          {summary ? summary : "Submit a document to get started"}
        </Markdown>
      </div>
    </section>
  );
};

export default Summarizer;
