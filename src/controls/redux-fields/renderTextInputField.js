import * as React from 'react'
import { Input } from '../data-entry'
import { Toast } from '../feedback'

export function renderTextInputField(props) {
    const { input, meta, label, type, placeholder } = props
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
        >
            {label}
        </Input>
    )
}