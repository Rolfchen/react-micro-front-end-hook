import type { ScriptMeta } from "./ScriptMeta";

export type MicroFrontEndHookState = {
  isLoaded: boolean,
  entry: null | ScriptMeta,
  dependencies: null | ScriptMeta[]
  // Dependency Queue is used to determine whether the dependency script has been loaded.
  dependencyQueue: null | {
    [id: string]: boolean
  }
}
