import { useInputContext } from "../context/InputContext.tsx";
import Loader from "./Loader.tsx";

const Visualizer = () => {
  const { imgUrl, loading } = useInputContext();
  return (
    <section className="min-w-[80vw] flex flex-col items-center justify-center ">
      <h1 className="text-3xl p-2 bg-gray-400/70 max-w-[80%] min-w-[80vw] rounded-lg rounded-b-none text-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader className="w-12" />
            <p>Generating image...</p>
          </div>
        ) : (
          "Visualize"
        )}
      </h1>
      <div className="p-4 bg-gray-300 max-w-[80%] min-w-[80vw] rounded-lg rounded-t-none">
        {imgUrl ? (
          <div>
            <img src={imgUrl} alt="Generated image" />
          </div>
        ) : (
          "Submit a document to get started"
        )}
      </div>
    </section>
  );
};

export default Visualizer;
