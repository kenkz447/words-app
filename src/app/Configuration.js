import { createStackNavigator } from 'react-navigation'
import { Thread } from 'react-native-threads'

import { AppEvent } from './Type'
import { App } from './App'

interface ConfigurationProps {
    appTitle: string
}

export class Configuration {
    eventHandlers: { [key: AppEvent]: (e) => void }
    registeredSreens: React.ComponentType[]

    constructor(props: ConfigurationProps) {
        this.eventHandlers = {}
        this.registeredSreens = []
    }

    useWorker(workerPath: string, setup: (worker) => void) {
        const newWorker = new Thread(workerPath)
        setup(newWorker)
    }

    addEventListener(event: AppEvent, eventHandler: (e) => void) {
        this.eventHandlers[event] = eventHandler
    }

    registerScreen(Screen: React.ComponentType) {
        this.registeredSreens.push(Screen)
    }

    createApp() {
        const appScreens = {}
        for (const registeredSreen of this.registeredSreens) {
            appScreens[registeredSreen.name] = registeredSreen
        }

        return App({
            Navigator: createStackNavigator(appScreens, { title: 'Welcome', header: { visible: false } }),
            beforeStart: this.eventHandlers.beforeStart,
            onStart: this.eventHandlers.onStart
        })
    }
}