import { App, Configuration } from './app'
import { Home } from './screens'

export function startup(): App {
    const appConfiguration = new Configuration({
        appTitle: 'Words'
    })

    appConfiguration.useWorker('src/threads/simpleThread.js', (worker) => {
        worker.postMessage('Start a simple thread...')
        worker.onmessage = (message) => {
            console.log(message)
        }
    })

    appConfiguration.addEventListener('fetch', (e) => {
        // on fetching
    })

    appConfiguration.addEventListener('onstart', (e) => {
        console.disableYellowBox = true
    })

    appConfiguration.registerScreen(Home)

    return new App(appConfiguration)
}