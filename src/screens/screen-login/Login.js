
import React from 'react'
import { Text, View } from 'react-native'

import { Screen } from '@/app'
import { appStyles } from '@/configs'

import { LoginForm } from './containers/LoginForm'

@Screen
export class Login extends React.Component {
  render() {
    return (
      <View flex={1} style={appStyles.page}>
        <View style={appStyles.container} marginBottom={50}>
          <Text style={appStyles.heading1}>WORDS</Text>
        </View>
        <LoginForm />
      </View >
    )
  }
}