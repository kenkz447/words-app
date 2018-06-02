import React from 'react'

import {
    default as AntdInput,
    InputItemProps as AntdInputItemProps
} from 'antd-mobile/lib/input-item'

export function Input(props: AntdInputItemProps) {
    return (<AntdInput  {...props} />)
}