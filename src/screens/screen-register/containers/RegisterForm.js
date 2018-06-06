import React from 'react'
import { Text, Keyboard } from 'react-native'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'

import Icon from 'react-native-vector-icons/EvilIcons'

import { Button, RenderTextInputField, Form, WhiteSpace } from '@/controls'
import { UserManager, text, isEmail } from '@/utilities'
import { NavigationContext } from '@/app';

interface RegisterFormValues {
    username: string,
    email: string,
    password: string
}

class RegisterFormComponent extends React.Component<InjectedFormProps<RegisterFormValues>> {
    _emailField: Field
    _passwordField: Field

    render() {
        const { handleSubmit, submitting, error } = this.props

        return (
            <Form error={error}>
                <Field
                    name="username"
                    component={RenderTextInputField}
                    label={<Text><Icon name="user" size={30} /></Text>}
                    placeholder="Tên hiển thị"
                    onSubmitEditing={() => {
                        const inputElement: RenderTextInputField = this._emailField.getRenderedComponent()
                        inputElement.focus()
                    }}
                />
                <Field
                    name="email"
                    component={RenderTextInputField}
                    label={<Text><Icon name="envelope" size={30} /></Text>}
                    placeholder="Email"
                    type="email"
                    onSubmitEditing={() => {
                        const inputElement: RenderTextInputField = this._passwordField.getRenderedComponent()
                        inputElement.focus()
                    }}
                    ref={element => this._emailField = element}
                    withRef
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
                <WhiteSpace size="sm" />
                <Button loading={submitting} color="buttonBlack" type="primary" onClick={handleSubmit}>
                    {text('Đăng Ký')}
                </Button>
                <WhiteSpace size="sm" />
                <NavigationContext.Consumer>
                    {(navigation) => (
                        <Button color="buttonBlack" type="ghost" onClick={() => navigation.navigate('Login')}>
                            {text('Đăng nhập')}
                        </Button>
                    )}
                </NavigationContext.Consumer>
            </Form>
        )
    }
}

export const RegisterForm = reduxForm({
    form: 'register',
    onSubmit: async (formValues: RegisterFormValues) => {
        Keyboard.dismiss()
        try {
            await UserManager.asyncRegister(formValues)
        } catch (result) {
            const { errors } = JSON.parse(result)

            const formErrors = {
                _error: text('Không thể đăng ký!')
            }

            for (const key in errors) {
                formErrors[key] = errors[key].msg
            }

            throw new SubmissionError(formErrors)
        }
    },
    validate: (formValues: RegisterFormValues) => {
        const error = {}
        if (!formValues.username || formValues.username.length < 3)
            error.username = text('Nhập tên hiển thị tối thiểu 3 ký tự')

        if (!isEmail(formValues.email))
            error.email = text('Vui lòng nhập email')

        if (!formValues.password || formValues.password.length < 3)
            error.password = text('Mật khẩu tối thiểu 3 ký tự')

        return error
    }
})(RegisterFormComponent)