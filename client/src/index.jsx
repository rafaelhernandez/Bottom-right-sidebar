import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.css";
import RightBottomSidebar from "./components/App.jsx";

let url = window.location.href.split("/").pop();
url.charAt(url.length - 1) === "/" ? url.substr(0, url.length - 1) : url;

ReactDOM.hydrate(
  <RightBottomSidebar businessId={url} initialState={window.__SIDEBAR_INITIAL_STATE__}></RightBottomSidebar>,
  document.getElementById("right_bottom_sidebar")
);