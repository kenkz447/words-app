import { StackNavigator } from 'react-navigation'

import { Configuration } from './Configuration'

export class App {
    static instance
    static getInstance() {
        return this.instance
    }

    Screens: React.ComponentType[]

    constructor(props: Configuration) {
        this.instance = this
        this.Screens = props.registeredSreens
    }

    getNavigator() {
        const screens = {}

        for (const Screen of this.Screens)
            screens[Screen.name] = Screen

        return StackNavigator(screens)
    }
}