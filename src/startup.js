import { App, Configuration } from './app'
import { Home } from './screens'

export function startup(): App {
    const appConfiguration = new Configuration({
        appTitle: 'Words'
    })

    appConfiguration.useWorker('src/workers/simpleWorker.js', (worker) => {
        worker.postMessage('start worker')
        worker.onmessage((message) => console.log(message))
    })

    appConfiguration.addEventListener('fetch', (e) => {
        // on fetching
    })

    appConfiguration.registerScreen(Home)

    return new App(appConfiguration)
}