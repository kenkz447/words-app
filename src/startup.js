import { reducer as formReducer } from 'redux-form'

import { Configuration, createReduxStore } from '@/app'
import { Login, Register } from '@/screens'
import { text } from '@/utilities'

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

    appConfiguration.registerScreen({
        name: 'Login',
        screen: Login,
        navigationOptions: () => ({
            title: text('Đăng nhập'),
        })
    })

    appConfiguration.registerScreen({
        name: 'Register',
        screen: Register,
        navigationOptions: () => ({
            title: text('Đăng Ký'),
        })
    })

    appConfiguration.registerScreen({
        name: 'Home',
        screen: () => null,
        navigationOptions: () => ({
            title: text('Trang chủ'),
        })
    })

    return appConfiguration.createApp()
}