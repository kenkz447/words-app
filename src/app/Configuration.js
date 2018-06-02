import { Worker } from 'react-native-workers'

import { AppEvent } from './Type'

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
        const newWorker = new Worker(workerPath)
        setup(newWorker)
    }

    addEventListener(event: AppEvent, eventHandler: (e) => void) {
        this.eventHandlers[event] = eventHandler
    }

    registerScreen(Screen: React.ComponentType) {
        this.registeredSreens.push(Screen)
    }
}