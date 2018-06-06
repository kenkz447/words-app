import React from 'react'

export const NavigationContext = React.createContext('navigation')

let currentNavigation

export function getCurrentNavigation() {
    return currentNavigation
}

function setCurrentNavigation(navigation) {
    currentNavigation = navigation
}

export const Screen = (ScreenComponent) => (props) => {
    setCurrentNavigation(props.navigation)
    return (
        <NavigationContext.Provider value={props.navigation}>
            <ScreenComponent {...props} />
        </NavigationContext.Provider >
    )
}