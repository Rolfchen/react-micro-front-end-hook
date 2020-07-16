import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import MicroFrontEndComponent from "./MicroFrontEndComponent";

const appContainer = document.getElementById("root");

render(
  <div>
    <MicroFrontEndComponent />
    <MicroFrontEndComponent />
  </div>,
  appContainer
);
