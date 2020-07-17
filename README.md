# React Micro Frontend Hook

_v0.1.3_

This component is designed to be used to import Micro Frontend libraries. To read more about Micro Frontends, have a read of the article by Martin Fowler:
https://martinfowler.com/articles/micro-frontends.html.

The library takes inspiration from the work by [@Sackrin](https://github.com/sackrin)'s MicroUI project, but with a slightly different approach. Be sure to check the similar [repository](https://github.com/sackrin/react-micro-ui-hooks) for alternative implementation.

There will be more explanations on the difference later.

## Installation

This library is currently in **beta**, so it's not publish on NPM yet. You can, however, use it directly as an npm module using the github import.

To run as an npm module from github, run the following command:

`npm install rolfchen/react-micro-front-end-hook#v0.1.0`

You can now import the module as you would usually from a node module. Definition files are shipped with the module, so you won't need to download from @types (not that there's any...)

## Usage

Basic usage looks like this:

```javascript
import React, { useRef } from "react";
import { useMicroFrontEnd } from "react-micro-front-end-hook";

export const MyMFEComponent = (props) => {
  const mfeRef = useRef(null);
  const { isLoaded, renderComponent } = useMicroFrontEnd(
    "https://microfrontenddomain.com", // Don't add last slash.
    "MyMFELibrary" // The Window UMD name of the MFE library.
  );

  const componentName = "MyMFEComponent"; // Component that's renderable from the MFE library.

  useEffect(() => {
    if (isLoaded) {
      renderComponent(componentName, mfeRef.current, props);
    }
  }, [isLoaded]);

  return <>{isLoaded ? <div ref={mfeRef} /> : "Loading..."}</>;
};
```

The hook takes in two parameters:

- Domain name of your MicroFrontEnd as string.
- MicroFrontEnd library name as string.

The hook returns three props:

- `isLoaded` - Whether the external library scripts are loaded.
- `renderComponent` - Renders the component on to a `react node ref` used in conjunction with the `useRef` or `createRef`.
- `renderComponentById` - Same with the above, but instead of using **refs**, it uses a domID. This means, that the element need to be a valid DOM node.

Under the hood, both `render` functions uses `render` function from `react-dom`, so it behaves similarly. In the usual implementation, `renderComponent` will take in

- the name of the component to render (If your MFE library has multiple components to offer),
- The node to run `render` on (as in `react-dom`'s render. )

You can, however, structure it whatever way you like, provided it's named `renderComponent`.

More documentation will be added for the prerequisit of your MFE library.

## MFE Pre-requisits
v0.1.3
Your **Micro-Frontend** library is essentially a JavaScript that will get dynamically imported by the hook above. The script must have the following:
* `manifest` - Accessed by {your_mfe_doman}/components/manifest. It should return data in **JSON** format with your main entry's key as **main.js**. The URL should be prefixed with a `/`. An example of the manifest looks like this:
```json
{
  "main.js": "/main.bundle.a1234999ahjhlkj1i2.js", 
  "vendor.js": "/vendor.bundle.a123412khjalkjh1l2kj3.js"
}
```

* Your main entry export should have two render functions: `renderComponent(componentName:string, ref: React.MutableRefObject<Element | null>, props?:any)` and `renderComponentById(componentName:string, id: string, props?:any)`. These function should be accessible as **umd**, or **window** object, so that it can be accessed by **window["MyLibrar"].renderComponent**

* As mentioned before, your library should be exported as either `libraryTarget: "umd"` or `libratyTarget: "window"` if you using **webpack**. 

In the future, I will try to make the MFE more flexible and friendly. BUT! In the meantime, you can check out [@Sackrin](https://github.com/sackrin), which would have library to help you build MicroUI libraries and a different useMicroUI hook. 
