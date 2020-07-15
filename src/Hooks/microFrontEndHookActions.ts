import { MFE_HOOK_ACTIONS } from "./Constants";
import { ScriptMeta } from "./Types/ScriptMeta";

const { SET_IS_LOADED, SET_ENTRY, SET_DEPENDENCIES, SET_DEPENDENCY_QUEUE } = MFE_HOOK_ACTIONS;

export const microFrontEndHookActions = {
  setIsLoaded: (isLoaded: boolean) => ({
    type: SET_IS_LOADED,
    isLoaded
  }),
  setEntry: (entry: ScriptMeta) => ({
    type: SET_ENTRY,
    entry
  }),
  setDependencies: (dependencies: ScriptMeta[]) => ({
    type: SET_DEPENDENCIES,
    dependencies
  }),
  setDependencyQueue: (dependencyQueue: {
    [id: string]: boolean
  }) => ({
    type: SET_DEPENDENCY_QUEUE,
    dependencyQueue
  }),
};

export default microFrontEndHookActions;
