import React from 'react'
import { Text, View } from 'react-native'

import { Button } from '@/controls'

import styles from './Home.styles'

export class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button color="buttonBlack">Start</Button>
      </View>
    )
  }
}