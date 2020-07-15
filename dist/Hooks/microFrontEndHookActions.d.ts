import { ScriptMeta } from "./Types/ScriptMeta";
export declare const microFrontEndHookActions: {
    setIsLoaded: (isLoaded: boolean) => {
        type: string;
        isLoaded: boolean;
    };
    setEntry: (entry: ScriptMeta) => {
        type: string;
        entry: ScriptMeta;
    };
    setDependencies: (dependencies: ScriptMeta[]) => {
        type: string;
        dependencies: ScriptMeta[];
    };
    setDependencyQueue: (dependencyQueue: {
        [id: string]: boolean;
    }) => {
        type: string;
        dependencyQueue: {
            [id: string]: boolean;
        };
    };
};
export default microFrontEndHookActions;
