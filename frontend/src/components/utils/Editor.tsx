import { SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor ({onChange}:{onChange: React.Dispatch<SetStateAction<string>>}) {
  const [content, setContent] = useState("");

  const handleChange = (value: string) => {
    setContent(value);
    onChange(value);
  };


  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        [{ 'align': [] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ['code-block']
      ],
    },
  };

  return <ReactQuill className="h-screen mx-4 my-2" value={content} onChange={handleChange} modules={modules} />;
}

