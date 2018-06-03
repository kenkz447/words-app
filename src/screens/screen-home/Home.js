
import React from 'react'
import { Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/EvilIcons'

import { Button, Input } from '@/controls'
import { appStyles } from '@/configs'
export class Home extends React.Component {
  _usernameInput
  _passwordInput

  render() {
    return (
      <View flex={1} style={appStyles.page}>
        <View style={appStyles.container} marginBottom={50}>
          <Text style={appStyles.heading1}>WORDS</Text>
        </View>
        <View marginBottom={15}>
          <Input placeholder="Username or email">
            <Text><Icon name="user" size={30} /></Text>
          </Input>
        </View>
        <View marginBottom={30}>
          <Input placeholder="Password" type="password">
            <Text><Icon name="lock" size={30} /></Text>
          </Input>
        </View>
        <View marginBottom={5}>
          <Button color="buttonBlack" type="primary" onClick={this.onLogin}>Login</Button>
        </View>
        <Button color="buttonBlack" type="ghost" >Register</Button>
      </View >
    )
  }

  onLogin() {
    
  }
}