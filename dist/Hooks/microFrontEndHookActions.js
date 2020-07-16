"use strict";
exports.__esModule = true;
exports.microFrontEndHookActions = void 0;
var Constants_1 = require("./Constants");
var SET_IS_LOADED = Constants_1.MFE_HOOK_ACTIONS.SET_IS_LOADED, SET_ENTRY = Constants_1.MFE_HOOK_ACTIONS.SET_ENTRY, SET_DEPENDENCIES = Constants_1.MFE_HOOK_ACTIONS.SET_DEPENDENCIES, SET_DEPENDENCY_QUEUE = Constants_1.MFE_HOOK_ACTIONS.SET_DEPENDENCY_QUEUE;
exports.microFrontEndHookActions = {
    setIsLoaded: function (isLoaded) { return ({
        type: SET_IS_LOADED,
        isLoaded: isLoaded
    }); },
    setEntry: function (entry) { return ({
        type: SET_ENTRY,
        entry: entry
    }); },
    setDependencies: function (dependencies) { return ({
        type: SET_DEPENDENCIES,
        dependencies: dependencies
    }); },
    setDependencyQueue: function (dependencyQueue) { return ({
        type: SET_DEPENDENCY_QUEUE,
        dependencyQueue: dependencyQueue
    }); }
};
exports["default"] = exports.microFrontEndHookActions;
//# sourceMappingURL=microFrontEndHookActions.js.map