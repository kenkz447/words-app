import { AppRegistry } from 'react-native'
import { startup } from './src'

const App = startup()

AppRegistry.registerComponent('words', () => App)