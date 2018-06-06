
import React from 'react'
import { Text, View } from 'react-native'

import { Screen } from '@/app'
import { appStyles } from '@/configs'

import { RegisterForm } from './containers'

@Screen
export class Register extends React.Component {
  render() {
    return (
      <View flex={1} style={appStyles.page}>
        <View style={appStyles.container} marginBottom={50}>
          <Text style={appStyles.heading1}>WORDS</Text>
        </View>
        <RegisterForm />
      </View >
    )
  }
}