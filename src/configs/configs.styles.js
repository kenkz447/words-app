import { FlexStyle, TextStyle } from 'react-native'

type AppStyles = { [key: string]: FlexStyle & TextStyle }

export const appStyles: AppStyles = {
    page: {
        // padding: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    heading1: {
        fontSize: 20,
        fontWeight: 'bold'
    }
}