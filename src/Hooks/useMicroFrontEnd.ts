import { useEffect, useCallback, useReducer } from "react";
import superagent from "superagent";
import { microFrontEndHookReducer } from "./microFrontEndHookReducer";
import { microFrontEndHookActions as Action } from "./microFrontEndHookActions";
import { EVENT_MFE_MOUNTED } from "./Constants";
import { getDefaultMicroFrontEndHookState } from "./Helpers/getDefaultMicroFrontEndHookState";

import type { RenderComponent } from "./Types/RenderComponent";
import type { RenderComponentById } from "./Types/RenderComponentById";

type UseMicroFrontEnd = (
  mfeDomain: string,
  libName: string
) => {
  isLoaded: boolean,
  renderComponent: RenderComponent,
  renderComponentById: RenderComponentById
};

export const useMicroFrontEnd: UseMicroFrontEnd = (mfeDomain, libName) => {
  const [{
    isLoaded, entry, dependencyQueue, dependencies
  }, dispatch] = useReducer(microFrontEndHookReducer, getDefaultMicroFrontEndHookState());

  const handleMFEMounted = (e) => {
    dispatch(Action.setIsLoaded(true));
  }

  useEffect(() => {
    if (window[libName]) {
      dispatch(Action.setIsLoaded(true));
    }
    else {
      window.addEventListener(EVENT_MFE_MOUNTED, handleMFEMounted);
    }
  }, []);

  useEffect(() => {
    if (!window[libName] && !isLoaded) {
      loadScripts(mfeDomain);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (dependencyQueue !== null) {
      const allLoaded = Object.values<boolean>(dependencyQueue).reduce<boolean>((loaded, nextCheck) => {
        return loaded && nextCheck;
      }, true);
      if (allLoaded) {
        loadMainEntry();
      }
    }
  }, [dependencyQueue]);

  useEffect(() => {
    if (dependencies && dependencies.length > 0) {
      const dependencyLoadQueue = dependencies.reduce((queue, dependency) => {
        return {
          ...queue,
          [dependency.id]: false
        };
      }, {});
      dispatch(Action.setDependencyQueue(dependencyLoadQueue));
      dependencies.forEach((scriptMeta) => {
        if (document.getElementById(`${libName}-${scriptMeta.id}`) === null) {
          const entryElement = document.createElement("script");
          entryElement.src = scriptMeta.url;
          entryElement.id = `${libName}-${scriptMeta.id}`;
          entryElement.onload = () => {
            dispatch(Action.setDependencyQueue({
              ...dependencyQueue,
              [scriptMeta.id]: true
            }));
          }
          entryElement.onerror = () => {
            dispatch(Action.setDependencyQueue({
              ...dependencyQueue,
              [scriptMeta.id]: false
            }));
          }
          if (document.querySelector(`script[src="${scriptMeta.url}]`) === null) {
            document.head.appendChild(entryElement);
          }
        }
      });
    }
  }, [dependencies])

  const renderComponent = useCallback(
    (componentName, ref, prop) => {
      window[libName].renderComponent(componentName, ref, prop);
    },
    [isLoaded]
  );

  const renderComponentById = useCallback(
    (componentName, id, prop) => {
      window[libName].renderComponentById(componentName, id, prop);
    },
    [isLoaded]
  );

  const loadMainEntry = () => {
    // If not loaded, try load it.
    if (document.head.querySelector(`script[src="${entry.url}"]`) === null) {
      const entryElement = document.createElement("script");
      entryElement.src = entry.url;
      entryElement.id = entry.id;
      entryElement.onload = () => {
        if (window[libName] && !isLoaded) {
          window.dispatchEvent(new CustomEvent(EVENT_MFE_MOUNTED, {
            detail: {
              name: libName
            }
          }));
        }
      }
      entryElement.onerror = () => {
        // @TODO - Error rejection!
      }
      document.head.appendChild(entryElement);
    }
  }

  const loadScripts = async (microUiDomain) => {
    const manifestUrl = `${microUiDomain}/components/manifest`;
    const response = await superagent.get(manifestUrl);
    const manifest = response.body;
    const entryScriptId = "main.js";
    const entryUrl = `${microUiDomain}/components${manifest[entryScriptId]}`;
    dispatch(Action.setEntry({
      id: `${libName}-${entryScriptId}`,
      url: entryUrl
    }));
    const libDependencies = Object.entries<string>(manifest).reduce(
      (dependencyList, scriptEntry) => {
        const [id, path] = scriptEntry;
        if (id !== entryScriptId && !path.includes(".map")) {
          return [
            ...dependencyList,
            {
              id,
              url: `${microUiDomain}/components${path}`
            }
          ]
        }
        return dependencyList;
      },
      []
    );
    // @NOTE - Dispatch to state, but it's not currently in use.
    dispatch(Action.setDependencies(libDependencies));
  };
  return {
    isLoaded,
    renderComponent,
    renderComponentById
  }
}

export default useMicroFrontEnd;
