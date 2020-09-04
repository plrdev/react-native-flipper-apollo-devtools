import React from "react";
import styled from "@emotion/styled";

export default ({ active }) => (
  <GraphQLSvg version="1.1" width="32" height="32" viewBox="0 0 32 32">
    <path
      fill={active ? "#2bd0c0" : "#fff"}
      d="M28.751 3.996h-25.5c-0.69 0-1.25 0.56-1.25 1.25v21.5c0 0.69 0.56 1.25 1.25 1.25h9.893c0.035 0.003 0.071 0.005 0.107 0.005s0.072-0.002 0.107-0.005h15.393c0.69 0 1.25-0.56 1.25-1.25v-21.5c0-0.69-0.56-1.25-1.25-1.25zM4.501 6.496h7.5v19h-7.5v-19zM27.501 25.496h-13v-19h13v19z"
    />
    <path
      fill={active ? "#2bd0c0" : "#fff"}
      d="M7.21 10.001h2.075c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2.075c-0.552 0-1 0.448-1 1s0.448 1 1 1z"
    />
    <path
      fill={active ? "#2bd0c0" : "#fff"}
      d="M7.21 14.001h2.075c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2.075c-0.552 0-1 0.448-1 1s0.448 1 1 1z"
    />
    <path
      fill={active ? "#2bd0c0" : "#fff"}
      d="M7.21 18.001h2.075c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2.075c-0.552 0-1 0.448-1 1s0.448 1 1 1z"
    />
  </GraphQLSvg>
);

const GraphQLSvg = styled.svg({
  display: "inline-block",
  width: "40%",
  maxWidth: "50px",
  minWidth: "20px",
  height: "30px",
  verticalAlign: "top",
});
