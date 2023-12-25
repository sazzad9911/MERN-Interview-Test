import React from "react";
import { Html } from "react-konva-utils";

function getStyle(fontSize) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    colour: "black",
    fontSize: `${fontSize}px`,
    fontFamily: "sans-serif"
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: "-4px"
  };
}

export function EditableTextInput({
  x,
  y,
  value,
  onChange,
  onKeyDown,
  fontSize,
}) {
  const style = getStyle(fontSize);
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
    </Html>
  );
}
