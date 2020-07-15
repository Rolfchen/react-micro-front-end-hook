import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import { useMicroFrontEnd } from "../src/Hooks/useMicroFrontEnd";

const MicroFrontEndComponent = () => {
  const mfeDomain = "https://mfe-buyers-dev.fairfarms.com.au";
  const libName = "mfeFairFarmsBuyers";
  const componentName = "StatisticsOverview";
  const { isLoaded, renderComponent } = useMicroFrontEnd(mfeDomain, libName);

  const rootRef = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      renderComponent(componentName, rootRef.current);
    }
  }, [isLoaded]);

  return (
    <>{isLoaded ? <div ref={rootRef}></div> : "Loading Micro Front End..."}</>
  );
};

const appContainer = document.getElementById("root");

render(
  <div>
    <MicroFrontEndComponent />
  </div>,
  appContainer
);
