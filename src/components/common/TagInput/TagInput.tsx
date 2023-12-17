import React, { useRef } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS

interface PropsType {
  handleChange: (tags: string[]) => void;
  defaultValue?: string[];
}

const TagInput: React.FC<PropsType> = ({ defaultValue = [], handleChange }) => {
  const tagifyRef = useRef();

  return (
    <Tags
      tagifyRef={tagifyRef}
      defaultValue={defaultValue}
      onChange={(e) => {
        const values = e.detail.tagify.value.map((item) => item.value);
        handleChange(values);
      }}
    />
  );
};

export default TagInput;
