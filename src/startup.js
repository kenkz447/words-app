import { Configuration } from './app'
import { Home } from './screens'

export function startup(): React.ComponentType {
    const appConfiguration = new Configuration({
        appTitle: 'Words'
    })

    appConfiguration.useWorker('src/threads/simpleThread.js', (worker) => {
        worker.postMessage('Start a simple thread...')
        worker.onmessage = (message) => {
            console.log(message)
        }
    })

    appConfiguration.addEventListener('beforeStart', () => {
        console.disableYellowBox = true
    })

    appConfiguration.addEventListener('onStart', () => {
        console.log('App started')
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