import React from "react";
import { ReactNode } from "react";
interface rageApiProviderProps {
    children: ReactNode;
}
type implRageFC<T = unknown> = (data: T) => void;
type rageFC = <T = unknown>(event: string, func: implRageFC<T>, deps?: React.DependencyList) => void;
declare const callRage: (event: string, data: any) => void;
declare const callRageServer: (event: string, data: any) => void;
declare const useRageEvent: rageFC;
declare const RageApiProivder: ({ children }: rageApiProviderProps) => React.JSX.Element;
export { useRageEvent, RageApiProivder, callRage, callRageServer };
