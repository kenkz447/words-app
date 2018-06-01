import React from 'react'

import { 
    default as AntdButton, 
    ButtonProps as AntdButtonProps
} from 'antd-mobile/lib/button'

import buttonStyles from './Button.styles'

interface ButtonProps extends AntdButtonProps {
    color: 'buttonWhite' | 'buttonBlack'
}

export function Button(props: ButtonProps) {
    return (<AntdButton  {...props} style={buttonStyles} />)
}