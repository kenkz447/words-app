
import React from 'react'
import { Text, View } from 'react-native'


import { Button } from '@/controls'
import { appStyles } from '@/configs'

export class Home extends React.Component {
  render() {
    return (
      <View flex={1} style={appStyles.page}>
        <View style={appStyles.container} marginBottom={50}>
          <Text style={appStyles.heading1}>WORDS</Text>
        </View>
        <Button color="buttonBlack" type="ghost" >Register</Button>
      </View >
    )
  }

  onLogin() {
    
  }
}