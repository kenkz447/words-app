import * as React from 'react'
import { Input } from '../data-entry'
import { Toast } from '../feedback'

export class RenderTextInputField extends React.Component {
    _input: Input

    render() {
        const { input, meta, label, type, placeholder, onSubmitEditing } = this.props
        const { error, touched } = meta

        const isError = touched && (error !== undefined)

        return (
            <Input
                {...input}
                type={type}
                placeholder={placeholder}
                error={isError}
                onErrorClick={isError && function inputErrorClick(e) {
                    Toast.info(error, 1)
                }}
                onSubmitEditing={onSubmitEditing}
                ref={(element) => this._input = element}
            >
                {label}
            </Input>
        )
    }

    focus() {
        this._input.focus()
    }
}