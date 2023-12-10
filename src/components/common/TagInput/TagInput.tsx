import { useRef } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS

const TagInput = () => {
  const tagifyRef = useRef();

  return (
    <Tags
      tagifyRef={tagifyRef}
      onChange={(e) => {
        console.log(e.detail.tagify.value, e.detail.tagify.getCleanValue(), e.detail.value);
      }}
    />
  );
};

export default TagInput;
