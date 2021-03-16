import React from "react";
import "./src/template/css/page.css";
import { TextProvider } from "./src/components/textContext";

export const wrapRootElement = ({ element }) => (
  <TextProvider>{element}</TextProvider>
);
