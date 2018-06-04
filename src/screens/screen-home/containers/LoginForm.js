import React from 'react'
import { Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/EvilIcons'
import { Button, Input } from '@/controls'

export function LoginForm(props: FormikProps) {
    return (
        <View>
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
                <Button color="buttonBlack" type="primary" onClick={this.onLogin}>
                    Login
                </Button>
            </View>
        </View>
    )
}