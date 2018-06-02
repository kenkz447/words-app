import React from 'react'

interface AppProps {
    Navigator: React.ComponentType,
    beforeStart: () => void,
    onStart: () => void,
}

export const App = (appProps: AppProps) => class AppWrapper extends React.Component {

    constructor(props) {
        super(props)
        appProps.beforeStart && appProps.beforeStart()
    }

    componentDidMount(){
        appProps.onStart && appProps.onStart()
    }

    render() {
        const { Navigator } = appProps
        return <Navigator />
    }
}