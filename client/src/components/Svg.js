import React from "react";
// Define the Svg component.
const Svg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || "16"} // Set the SVG width (default: 16).
    height={props.height || "16"} // Set the SVG height (default: 16).
    fill={props.fill || "currentColor"} // Set the SVG fill color (default: currentColor).
    className={props.className || "w-5 h-5"} // Set the SVG class (default: "w-5 h-5").
    viewBox="0 0 16 16" // Set the SVG viewBox.
  >
    {/* Your SVG path data goes here */}
    {/* For example: */}
    {/* <path d="M8 0L0 8h3v8h10V8h3L8 0z" /> */}
  </svg>
);
// Export the Svg component as the default export.
export default Svg;
