import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const EditComment = styled.textarea`
  outline: 1px solid #e3e3e3;
  outline-offset: 10px;
  border: none;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100px;
  overflow: hidden;
  cursor: text;
  color: black;
  &:disabled {
    border: none;
    outline: none;
    resize: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    min-height: 100px;
    overflow: hidden;
    cursor: text;
    color: black;
  }
  &:first-child {
    color: red;
  }
`;

function EditComment({ defaultValue, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(defaultValue) && defaultValue.length === 2) {
      setValue(`@${defaultValue[0]} ${defaultValue[1]}`);
    }
  }, [defaultValue]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <StyledTextArea
      ref={textareaRef}
      value={value}
      onChange={handleInputChange}
      disabled={disabled}
      style={{ color: defaultValue[0] ? "blue" : "black" }}
    />
  );
}

export default EditComment;
