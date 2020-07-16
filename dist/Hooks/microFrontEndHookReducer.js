"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.microFrontEndHookReducer = void 0;
var MFE_HOOK_ACTIONS_1 = __importDefault(require("./Constants/MFE_HOOK_ACTIONS"));
var SET_IS_LOADED = MFE_HOOK_ACTIONS_1["default"].SET_IS_LOADED, SET_ENTRY = MFE_HOOK_ACTIONS_1["default"].SET_ENTRY, SET_DEPENDENCIES = MFE_HOOK_ACTIONS_1["default"].SET_DEPENDENCIES, SET_DEPENDENCY_QUEUE = MFE_HOOK_ACTIONS_1["default"].SET_DEPENDENCY_QUEUE;
exports.microFrontEndHookReducer = function (state, action) {
    switch (action.type) {
        case SET_IS_LOADED:
            return __assign(__assign({}, state), { isLoaded: action.isLoaded });
        case SET_ENTRY:
            return __assign(__assign({}, state), { entry: action.entry });
        case SET_DEPENDENCIES:
            return __assign(__assign({}, state), { dependencies: action.dependencies });
        case SET_DEPENDENCY_QUEUE:
            return __assign(__assign({}, state), { dependencyQueue: action.dependencyQueue });
        default:
            return state;
    }
};
exports["default"] = exports.microFrontEndHookReducer;
//# sourceMappingURL=microFrontEndHookReducer.js.map