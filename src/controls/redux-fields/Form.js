import React from 'react'
import { View } from 'react-native'

import { WingBlank, WhiteSpace } from '../layout'

import { FormError } from './FormError'

export function Form(props) {
    const { error } = props
    return (
        <View>
            <FormError error={error} />
            <WingBlank size="lg">
                {props.children}
            </WingBlank>
            <WhiteSpace size="lg" />
        </View>
    )
}