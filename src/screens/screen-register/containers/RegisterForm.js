import React from 'react'
import { Text } from 'react-native'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'

import Icon from 'react-native-vector-icons/EvilIcons'

import { Button, renderTextInputField, Form, WhiteSpace } from '@/controls'
import { AuthHelper, text, isEmail, FetchHelper } from '@/utilities'
import { apiEntry } from '@/configs'

interface RegisterFormValues {
    email: string,
    password: string,
    rePassword: string
}

function LoginFormComponent(props: InjectedFormProps<RegisterFormValues>) {
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
            <Field
                name="rePassword"
                component={renderTextInputField}
                label={<Text><Icon name="lock" size={30} /></Text>}
                placeholder={text('Nhập lại mật khẩu')}
                type="password"
            />
            <WhiteSpace size="lg" />
            <Button loading={submitting} color="buttonBlack" type="primary" onClick={handleSubmit}>
                {text('Đăng Ký')}
            </Button>
            <WhiteSpace size="sm" />
            <Button color="buttonBlack" type="ghost">{text('Đăng nhập')}</Button>
        </Form>
    )
}

export const LoginForm = reduxForm({
    form: 'login',
    onSubmit: async (formValues: RegisterFormValues, dispatch, ownProps) => {
        try {
            const result = await FetchHelper.asyncStart({
                url: `${apiEntry}/register`,
                method: 'POST',
                data: formValues
            })
            await AuthHelper.asyncTokenLogin(result.token)
        } catch (error) {
            throw new SubmissionError({
                _error: text('Sai tên đăng nhập hoặc mật khẩu!')
            })
        }
    },
    validate: (formValues: RegisterFormValues) => {
        const error = {}
        if (!isEmail(formValues.email))
            error.email = text('Vui lòng nhập email')

        if (!formValues.password)
            error.password = text('Vui lòng nhập mật khẩu')

        if (formValues.password !== formValues.rePassword)
            error.rePassword = text('Mật khẩu không trùng khớp')

        return error
    }
})(LoginFormComponent)