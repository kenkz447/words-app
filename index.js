import { AppRegistry } from 'react-native'
import { startup } from './src'

const app = startup()
const Navigator = app.getNavigator()

AppRegistry.registerComponent('words', () => Navigator)
