import React from 'react'

import { 
    default as AntdButton, 
    ButtonProps as AntdButtonProps
} from 'antd-mobile/lib/button'

import buttonStyles from './Button.styles'

export function Button(props: AntdButtonProps) {
    return (<AntdButton  {...props}/>)
}