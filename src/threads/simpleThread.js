import { self } from 'react-native-threads'

self.onmessage = (message) => {
    console.log('Worker received message', message)
}

self.postMessage('Ping')