"use client";

import ReactDOM from "react-dom";

export function ResourceHints() {
  ReactDOM.preconnect("https://fonts.googleapis.com");
  ReactDOM.preconnect("https://fonts.gstatic.com", {
    crossOrigin: "anonymous",
  });
  return null;
}
