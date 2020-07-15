import type { MicroFrontEndHookState } from "../Types/MicroFrontEndHookState";

type GetDefaultMicroFrontEndHookState = () => MicroFrontEndHookState;
export const getDefaultMicroFrontEndHookState: GetDefaultMicroFrontEndHookState = () => ({
  isLoaded: false,
  entry: null,
  dependencies: null,
  dependencyQueue: null
});

export default getDefaultMicroFrontEndHookState;
