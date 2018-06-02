import { self } from 'react-native-workers'

self.onmessage = (message) => {
    console.log('Worker received message', message)
}

self.postMessage('Ping')