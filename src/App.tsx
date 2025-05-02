import Input from "./components/Input.tsx";
import Summarizer from "./components/Summarizer.tsx";
import Visualizer from "./components/Visualizer.tsx";

const App = () => {
  return (
    <main className="flex flex-col items-center justify-center p-4 gap-4 ">
      <h1 className="lg:text-5xl text-3xl gradient-text">
        Summarize & Visualize
      </h1>
      <div className="min-w-[80vw] max-w-[80vw] flex flex-col gap-8">
        <Input />
        <Summarizer />
        <Visualizer />
      </div>
    </main>
  );
};

export default App;
