import React from "react"
import { ReactNode, useEffect } from "react"

declare const mp: {
    trigger: (event: string, ...args: any) => {}
}

const ALIAS_REACT_API: string = 'rageapi_'

interface rageApiProviderProps {
    children: ReactNode
}

type implRageFC<T = unknown> = (data: T) => void
type rageFC = <T = unknown>(event: string, func: implRageFC<T>, deps?: React.DependencyList) => void


const callRage = (event: string, data: any) => {
    try {
        mp.trigger('React@RedirectToClient', event, JSON.stringify(data))
    } catch { }
}

const callRageServer = (event: string, data: any) => {
    try {
        mp.trigger(
            'React@RedirectToServer',
            event,
            JSON.stringify(data)
        )
    } catch { }
}

const useRageEvent: rageFC = (event, func, deps = []) => {
    useEffect(() => {
        const handler = ({ detail }: any) => {
            let data = null

            try {
                data = JSON.parse(detail)
            }
            catch {
                data = detail
            }

            func(data)
        }

        document.addEventListener(ALIAS_REACT_API + event, handler)
        return () => document.removeEventListener(ALIAS_REACT_API + event, handler)
    }, deps)
}


// function trigger(event: string, args: any) {
//     const call = new CustomEvent(ALIAS_REACT_API + event, { detail: args })
//     document.dispatchEvent(call)
// }

const RageApiProivder = ({ children }: rageApiProviderProps) => {
    useEffect(() => {
        const body = document.body
        const script = document.createElement('script')

        script.innerHTML = `
            function ragecall(event, args) {
                const call = new CustomEvent("${ALIAS_REACT_API}" + event, { detail: args })
                document.dispatchEvent(call)
            }
        `

        body.append(script)
    }, [])

    return <>{children}</>
}


export {
    useRageEvent, RageApiProivder,
    callRage, callRageServer
}