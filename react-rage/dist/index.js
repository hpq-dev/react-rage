"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callRageServer = exports.callRage = exports.RageApiProivder = exports.useRageEvent = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const ALIAS_REACT_API = 'rageapi_';
const callRage = (event, data) => {
    try {
        mp.trigger('React@RedirectToClient', event, JSON.stringify(data));
    }
    catch (_a) { }
};
exports.callRage = callRage;
const callRageServer = (event, data) => {
    try {
        mp.trigger('React@RedirectToServer', event, JSON.stringify(data));
    }
    catch (_a) { }
};
exports.callRageServer = callRageServer;
const useRageEvent = (event, func, deps = []) => {
    (0, react_2.useEffect)(() => {
        const handler = ({ detail }) => {
            let data = null;
            try {
                data = JSON.parse(detail);
            }
            catch (_a) {
                data = detail;
            }
            func(data);
        };
        document.addEventListener(ALIAS_REACT_API + event, handler);
        return () => document.removeEventListener(ALIAS_REACT_API + event, handler);
    }, deps);
};
exports.useRageEvent = useRageEvent;
// function trigger(event: string, args: any) {
//     const call = new CustomEvent(ALIAS_REACT_API + event, { detail: args })
//     document.dispatchEvent(call)
// }
const RageApiProivder = ({ children }) => {
    (0, react_2.useEffect)(() => {
        const body = document.body;
        const script = document.createElement('script');
        script.innerHTML = `
            function ragecall(event, args) {
                const call = new CustomEvent("${ALIAS_REACT_API}" + event, { detail: args })
                document.dispatchEvent(call)
            }
        `;
        body.append(script);
    }, []);
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.RageApiProivder = RageApiProivder;
