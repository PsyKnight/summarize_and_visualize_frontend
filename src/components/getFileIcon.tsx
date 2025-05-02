import { FaFileCircleQuestion, FaFilePdf, FaFileWord } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { getFileExtension } from "../utility/getFileExtension.ts";

export const GetFileIcon = ({ fileName }: { fileName: string | undefined }) => {
  const extension = getFileExtension(fileName);
  switch (extension) {
    case undefined:
      return <FaFileCircleQuestion size={80} />;

    case "docx":
      return <FaFileWord size={80} />;

    case "pdf":
      return <FaFilePdf size={80} />;

    case "txt":
      return <FaFileAlt size={80} />;
  }
};
