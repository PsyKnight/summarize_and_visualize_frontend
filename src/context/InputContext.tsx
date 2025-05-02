import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface InputContextType {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  extractedText: string;
  setExtractedText: Dispatch<SetStateAction<string>>;
  hasSubmitted: boolean;
  setHasSubmitted: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  summary: string;
  setSummary: Dispatch<SetStateAction<string>>;
  imgUrl: any;
  setImgUrl: Dispatch<SetStateAction<any>>;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<any>();

  return (
    <InputContext.Provider
      value={{
        text,
        setText,
        extractedText,
        setExtractedText,
        hasSubmitted,
        setHasSubmitted,
        loading,
        setLoading,
        summary,
        setSummary,
        imgUrl,
        setImgUrl,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error("useInputContext must be used inside InputProvider");
  }

  return context;
};
