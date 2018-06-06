import React from 'react'
import { Text } from 'react-native'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'

import Icon from 'react-native-vector-icons/EvilIcons'

import { NavigationContext } from '@/app'
import { Button, renderTextInputField, Form, WhiteSpace } from '@/controls'
import { AuthHelper, text, isEmail } from '@/utilities'

interface LoginFormValues {
    email: string,
    password: string
}

function LoginFormComponent(props: InjectedFormProps<LoginFormValues>, context) {
    const { handleSubmit, submitting } = props

    return (
        <Form {...props}>
            <Field
                name="email"
                component={renderTextInputField}
                label={<Text><Icon name="user" size={30} /></Text>}
                placeholder="Email"
                type="email"
            />
            <WhiteSpace size="sm" />
            <Field
                name="password"
                component={renderTextInputField}
                label={<Text><Icon name="lock" size={30} /></Text>}
                placeholder={text('Mật khẩu')}
                type="password"
            />
            <WhiteSpace size="lg" />
            <Button loading={submitting} color="buttonBlack" type="primary" onClick={handleSubmit}>
                {text('Đăng nhập')}
            </Button>
            <WhiteSpace size="sm" />
            <NavigationContext.Consumer>
                {
                    (navigation) => (
                        <Button
                            color="buttonBlack"
                            type="ghost"
                            onClick={() => {
                                navigation.navigate('Register')
                            }}>
                            {text('Đăng ký')}
                        </Button>
                    )
                }
            </NavigationContext.Consumer>
        </Form>
    )
}

export const LoginForm = reduxForm({
    form: 'login',
    onSubmit: async (formValues: LoginFormValues, dispatch, ownProps) => {
        try {
            await AuthHelper.asyncLogin(formValues)
        } catch (error) {
            throw new SubmissionError({
                _error: text('Sai tên đăng nhập hoặc mật khẩu!')
            })
        }
    },
    validate: (formValues: LoginFormValues) => {
        const error = {}
        if (!isEmail(formValues.email))
            error.email = text('Vui lòng nhập email')

        if (!formValues.password)
            error.password = text('Vui lòng nhập mật khẩu')

        return error
    }
})(LoginFormComponent)