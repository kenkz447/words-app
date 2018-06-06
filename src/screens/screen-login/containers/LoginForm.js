import React from 'react'
import { Text } from 'react-native'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'

import Icon from 'react-native-vector-icons/EvilIcons'

import { NavigationContext } from '@/app'
import { Button, RenderTextInputField, Form, WhiteSpace } from '@/controls'
import { UserManager, text, isEmail } from '@/utilities'

interface LoginFormValues {
    email: string,
    password: string
}

class LoginFormComponent extends React.Component<InjectedFormProps<LoginFormValues>> {
    _passwordField: Field

    render() {
        const { handleSubmit, submitting, error } = this.props

        return (
            <Form error={error}>
                <Field
                    name="email"
                    component={RenderTextInputField}
                    label={<Text><Icon name="user" size={30} /></Text>}
                    placeholder="Email"
                    type="email"
                    onSubmitEditing={() => {
                        const inputElement: RenderTextInputField = this._passwordField.getRenderedComponent()
                        inputElement.focus()
                    }}
                />
                <WhiteSpace size="sm" />
                <Field
                    name="password"
                    component={RenderTextInputField}
                    label={<Text><Icon name="lock" size={30} /></Text>}
                    placeholder={text('Mật khẩu')}
                    type="password"
                    onSubmitEditing={handleSubmit}
                    ref={element => this._passwordField = element}
                    withRef
                />
                <WhiteSpace size="lg" />
                <Button loading={submitting} color="buttonBlack" type="primary" onClick={handleSubmit}>
                    {text('Đăng nhập')}
                </Button>
                <WhiteSpace size="sm" />
                <NavigationContext.Consumer>
                    {(navigation) => (
                        <Button color="buttonBlack" type="ghost" onClick={() => navigation.navigate('Register')}>
                            {text('Đăng ký')}
                        </Button>
                    )}
                </NavigationContext.Consumer>
            </Form>
        )
    }

}

export const LoginForm = reduxForm({
    form: 'login',
    onSubmit: async (formValues: LoginFormValues, dispatch, ownProps) => {
        try {
            await UserManager.asyncLogin(formValues)
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