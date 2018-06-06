import React from 'react'
import { NoticeBar } from '../data-display'
import { WhiteSpace } from '../layout'

export function FormError(props) {
    const { error } = props

    if (!error)
        return null

    return (
        <React.Fragment>
            <NoticeBar mode="closable" icon={null}>{error}</NoticeBar>
            <WhiteSpace size="md" />
        </React.Fragment>
    )
}