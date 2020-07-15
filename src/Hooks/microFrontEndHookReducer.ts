import MFE_HOOK_ACTIONS from "./Constants/MFE_HOOK_ACTIONS";
import { MicroFrontEndHookState } from "./Types/MicroFrontEndHookState";

const { SET_IS_LOADED, SET_ENTRY, SET_DEPENDENCIES, SET_DEPENDENCY_QUEUE } = MFE_HOOK_ACTIONS;

type MicroFrontEndHookAction = {
  type: string,
  [key: string]: any
}

export type MicroFrontEndHookReducer = (state: MicroFrontEndHookState, action: MicroFrontEndHookAction) => MicroFrontEndHookState;

export const microFrontEndHookReducer: MicroFrontEndHookReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.isLoaded
      };
    case SET_ENTRY:
      return {
        ...state,
        entry: action.entry
      };
    case SET_DEPENDENCIES:
      return {
        ...state,
        dependencies: action.dependencies
      };
    case SET_DEPENDENCY_QUEUE:
      return {
        ...state,
        dependencyQueue: action.dependencyQueue
      };
    default:
      return state;
  }
}

export default microFrontEndHookReducer;
