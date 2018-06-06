import { AsyncStorage } from 'react-native'
import { apiEntry } from '@/configs'

interface AuthHelperProps {
    loginUrl: string,
    getToken: (loginResult) => string,
    afterLogin: () => void
}

export class AuthHelper {
    static initialProps: AuthHelperProps = {
        loginUrl: `${apiEntry}/getjwt`,
        getToken: (loginResult) => loginResult.token,
        afterLogin: () => {
            // redirect user to...
        }
    }

    static async asyncLogin(loginBody) {
        const { loginUrl, getToken, afterLogin } = this.initialProps
        try {
            const loginResponse = await fetch(loginUrl, {
                method: 'POST',
                body: JSON.stringify(loginBody),
                headers: new Headers({
                    'Conten-Type': 'application/json'
                })
            })

            if (!loginResponse.ok) {
                const errorMessage = await loginResponse.text()
                throw errorMessage
            }

            const loginResponseJson = await loginResponse.json()
            const token = getToken(loginResponseJson)
            await this.asyncTokenLogin(token)
        } catch (error) {
            throw error
        }
    }

    static async asyncTokenLogin(token) {
        const { afterLogin } = this.initialProps
        await AsyncStorage.setItem('token', token)
        afterLogin()
    }

    static async asyncGetToken() {
        return await AsyncStorage.getItem('token')
    }
}