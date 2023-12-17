import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import "./Editor.css";

const editorConfig = {
  plugins: [Essentials, Heading, Paragraph, Bold, Italic, Underline, Link, List, BlockQuote],
  toolbar: ["heading", "|", "bold", "italic", "underline", "link", "|", "bulletedList", "numberedList", "|", "undo", "redo"],
  heading: {
    options: [
      { model: "paragraph", title: "본문", class: "ck-heading_paragraph" },
      { model: "heading4", view: "h4", title: "제목1", class: "ck-heading_heading1" },
      { model: "heading5", view: "h5", title: "제목2", class: "ck-heading_heading2" },
      { model: "heading6", view: "h6", title: "제목3", class: "ck-heading_heading3" },
    ],
  },
};

interface PropsType {
  editorData: string;
  setEditorData: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: React.FC<PropsType> = ({ editorData, setEditorData }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  return <CKEditor editor={ClassicEditor} config={editorConfig} data={editorData} onBlur={handleEditorChange} />;
};

export default Editor;
