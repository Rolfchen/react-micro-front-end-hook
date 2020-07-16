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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useMicroFrontEnd = void 0;
var react_1 = require("react");
var superagent_1 = __importDefault(require("superagent"));
var microFrontEndHookReducer_1 = require("./microFrontEndHookReducer");
var microFrontEndHookActions_1 = require("./microFrontEndHookActions");
var Constants_1 = require("./Constants");
var getDefaultMicroFrontEndHookState_1 = require("./Helpers/getDefaultMicroFrontEndHookState");
exports.useMicroFrontEnd = function (mfeDomain, libName) {
    var _a = react_1.useReducer(microFrontEndHookReducer_1.microFrontEndHookReducer, getDefaultMicroFrontEndHookState_1.getDefaultMicroFrontEndHookState()), _b = _a[0], isLoaded = _b.isLoaded, entry = _b.entry, dependencyQueue = _b.dependencyQueue, dependencies = _b.dependencies, dispatch = _a[1];
    var handleMFEMounted = function (e) {
        dispatch(microFrontEndHookActions_1.microFrontEndHookActions.setIsLoaded(true));
    };
    react_1.useEffect(function () {
        window.addEventListener(Constants_1.EVENT_MFE_MOUNTED, handleMFEMounted);
    }, []);
    react_1.useEffect(function () {
        if (!isLoaded) {
            loadScripts(mfeDomain);
        }
    }, [isLoaded]);
    react_1.useEffect(function () {
        if (dependencyQueue !== null) {
            var allLoaded = Object.values(dependencyQueue).reduce(function (loaded, nextCheck) {
                return loaded && nextCheck;
            }, true);
            if (allLoaded) {
                loadMainEntry();
            }
        }
    }, [dependencyQueue]);
    react_1.useEffect(function () {
        if (dependencies && dependencies.length > 0) {
            var dependencyLoadQueue = dependencies.reduce(function (queue, dependency) {
                var _a;
                return __assign(__assign({}, queue), (_a = {}, _a[dependency.id] = false, _a));
            }, {});
            dispatch(microFrontEndHookActions_1.microFrontEndHookActions.setDependencyQueue(dependencyLoadQueue));
            dependencies.forEach(function (scriptMeta) {
                if (document.getElementById(libName + "-" + scriptMeta.id) === null) {
                    var entryElement = document.createElement("script");
                    entryElement.src = scriptMeta.url;
                    entryElement.id = libName + "-" + scriptMeta.id;
                    entryElement.onload = function () {
                        var _a;
                        dispatch(microFrontEndHookActions_1.microFrontEndHookActions.setDependencyQueue(__assign(__assign({}, dependencyQueue), (_a = {}, _a[scriptMeta.id] = true, _a))));
                    };
                    entryElement.onerror = function () {
                        var _a;
                        dispatch(microFrontEndHookActions_1.microFrontEndHookActions.setDependencyQueue(__assign(__assign({}, dependencyQueue), (_a = {}, _a[scriptMeta.id] = false, _a))));
                    };
                    if (document.querySelector("script[src=\"" + scriptMeta.url + "]") === null) {
                        document.head.appendChild(entryElement);
                    }
                }
            });
        }
    }, [dependencies]);
    var renderComponent = react_1.useCallback(function (componentName, ref, prop) {
        window[libName].renderComponent(componentName, ref, prop);
    }, [isLoaded]);
    var renderComponentById = react_1.useCallback(function (componentName, id, prop) {
        window[libName].renderComponentById(componentName, id, prop);
    }, [isLoaded]);
    var loadMainEntry = function () {
        // If not loaded, try load it.
        if (document.head.querySelector("script[src=\"" + entry.url + "\"]") === null) {
            var entryElement = document.createElement("script");
            entryElement.src = entry.url;
            entryElement.id = entry.id;
            entryElement.onload = function () {
                if (window[libName] && !isLoaded) {
                    window.dispatchEvent(new CustomEvent(Constants_1.EVENT_MFE_MOUNTED, {
                        detail: {
                            name: libName
                        }
                    }));
                }
            };
            entryElement.onerror = function () {
                // @TODO - Error rejection!
            };
            document.head.appendChild(entryElement);
        }
    };
    var loadScripts = function (microUiDomain) { return __awaiter(void 0, void 0, void 0, function () {
        var manifestUrl, response, manifest, entryScriptId, entryUrl, libDependencies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manifestUrl = microUiDomain + "/components/manifest";
                    return [4 /*yield*/, superagent_1["default"].get(manifestUrl)];
                case 1:
                    response = _a.sent();
                    manifest = response.body;
                    entryScriptId = "main.js";
                    entryUrl = microUiDomain + "/components" + manifest[entryScriptId];
                    dispatch(microFrontEndHookActions_1.microFrontEndHookActions.setEntry({
                        id: libName + "-" + entryScriptId,
                        url: entryUrl
                    }));
                    libDependencies = Object.entries(manifest).reduce(function (dependencyList, scriptEntry) {
                        var id = scriptEntry[0], path = scriptEntry[1];
                        if (id !== entryScriptId && !path.includes(".map")) {
                            return __spreadArrays(dependencyList, [
                                {
                                    id: id,
                                    url: microUiDomain + "/components" + path
                                }
                            ]);
                        }
                        return dependencyList;
                    }, []);
                    // @NOTE - Dispatch to state, but it's not currently in use.
                    dispatch(microFrontEndHookActions_1.microFrontEndHookActions.setDependencies(libDependencies));
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        isLoaded: isLoaded,
        renderComponent: renderComponent,
        renderComponentById: renderComponentById
    };
};
exports["default"] = exports.useMicroFrontEnd;
//# sourceMappingURL=useMicroFrontEnd.js.map