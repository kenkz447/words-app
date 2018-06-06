import React from 'react'

export const NavigationContext = React.createContext('navigation')

export function Screen(name: string) {
    return (ScreenComponent) => (props) => {
        return (
            <NavigationContext.Provider value={props.navigation}>
                <ScreenComponent {...props} />
            </NavigationContext.Provider >
        )
    }
}