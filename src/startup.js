import { reducer as formReducer } from 'redux-form'

import { Configuration, createReduxStore } from './app'
import { Home } from './screens'

export function startup(): React.ComponentType {
    const appConfiguration = new Configuration({
        appTitle: 'Words'
    })

    const reduxStore = createReduxStore({
        reducers: {
            form: formReducer
        }
    })

    appConfiguration.useReduxStore(reduxStore)

    appConfiguration.useAdditionalThread('src/threads/simpleThread.js', function threadWorker(thread) {
        thread.postMessage('Start a simple thread...')
        thread.onmessage = (message) => {
            console.log(message)
        }
    })

    appConfiguration.addEventListener('beforeStart', () => {
        console.disableYellowBox = true
        console.info('App rendering...')
    })

    appConfiguration.addEventListener('onStart', () => {
        console.info('App started!')
    })

    appConfiguration.addEventListener('fetch', (e) => {
        // on fetching
    })

    appConfiguration.registerScreen({
        name: Home.name,
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
        })
    })

    return appConfiguration.createApp()
}