
import React from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenOption, NavigationScreenProps } from 'react-navigation'

import { Screen } from '@/app'
import { appStyles } from '@/configs'

import { LoginForm } from './containers/LoginForm'

@Screen('Home')
export class Home extends React.Component<NavigationScreenOption<NavigationScreenProps>> {
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