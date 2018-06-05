import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Thread } from 'react-native-threads'
import { Provider } from 'react-redux'

import { AppEvent } from './Type'
import { App } from './App'

interface ConfigurationProps {
    appTitle: string
}

interface ScreenInfo {
    name: string,
    Screen: React.ComponentType,
    navigationOptions: ({ navigation: any }) => void
}

export class Configuration {
    eventHandlers: { [key: AppEvent]: (e) => void }
    registeredSreens: React.ComponentType[]
    reduxStore: any

    constructor(props: ConfigurationProps) {
        this.eventHandlers = {}
        this.registeredSreens = []
    }

    useReduxStore(store) {
        this.reduxStore = store
    }

    useAdditionalThread(workerPath: string, setup: (theard) => void) {
        const newThread = new Thread(workerPath)
        setup(newThread)
    }

    addEventListener(event: AppEvent, eventHandler: (e) => void) {
        this.eventHandlers[event] = eventHandler
    }

    registerScreen(screenInfo: ScreenInfo) {
        this.registeredSreens.push(screenInfo)
    }

    createApp() {
        return App({
            render: this.renderApp.bind(this),
            beforeStart: this.eventHandlers.beforeStart,
            onStart: this.eventHandlers.onStart
        })
    }

    renderApp() {
        const appScreens = {}

        for (const registeredSreen of this.registeredSreens) {
            appScreens[registeredSreen.name] = registeredSreen
        }

        const Navigator = createStackNavigator(appScreens)

        if (this.reduxStore)
            return (
                <Provider store={this.reduxStore}>
                    <Navigator />
                </Provider>
            )

        return <Navigator />
    }
}