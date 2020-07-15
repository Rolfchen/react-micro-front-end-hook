import type { ScriptMeta } from "./ScriptMeta";
export declare type MicroFrontEndHookState = {
    isLoaded: boolean;
    entry: null | ScriptMeta;
    dependencies: null | ScriptMeta[];
    dependencyQueue: null | {
        [id: string]: boolean;
    };
};
