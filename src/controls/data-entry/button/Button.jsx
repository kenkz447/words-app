// @flow

import React from 'react'

import AntdButton from 'antd-mobile/lib/button'

import buttonStyles from './Button.styles'

function Button(props) {
    return (<AntdButton {...props} style={buttonStyles} />)
}

export { Button }