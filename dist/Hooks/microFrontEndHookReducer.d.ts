import { MicroFrontEndHookState } from "./Types/MicroFrontEndHookState";
declare type MicroFrontEndHookAction = {
    type: string;
    [key: string]: any;
};
export declare type MicroFrontEndHookReducer = (state: MicroFrontEndHookState, action: MicroFrontEndHookAction) => MicroFrontEndHookState;
export declare const microFrontEndHookReducer: MicroFrontEndHookReducer;
export default microFrontEndHookReducer;
