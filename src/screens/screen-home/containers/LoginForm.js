import React from 'react'
import { Text, View } from 'react-native'
import { reduxForm, FormProps } from 'redux-form'

import Icon from 'react-native-vector-icons/EvilIcons'

import { Button, Input } from '@/controls'

interface LoginFormValues {
    username: string,
    password: string
}

function LoginFormComponent(props: FormProps<LoginFormValues>) {
    const { handleSubmit } = props

    return (
        <React.Fragment>
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
                <Button color="buttonBlack" type="primary" onClick={handleSubmit}>
                    Login
                </Button>
            </View>
        </React.Fragment>
    )
}

export const LoginForm = reduxForm<LoginFormValues>({
    form: 'login',
    onSubmit: (ownProps) => {
        debugger
    }
})(LoginFormComponent)
