import { AsyncStorage } from 'react-native'

import { apiEntry } from '@/configs'
import { getCurrentNavigation } from '@/app'

export class UserManager {
    static getToken = (loginResult) => loginResult.token

    static async asyncRegister(registerBody) {
        try {
            const registerResponse = await fetch(`${apiEntry}/register`, {
                method: 'POST',
                body: JSON.stringify(registerBody),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            if (!registerResponse.ok) {
                const errorMessage = await registerResponse.text()
                throw errorMessage
            }
            const registerResponseJson = await registerResponse.json()
            const token = this.getToken(registerResponseJson.token)
            await UserManager.asyncTokenLogin(token)
        } catch (error) {
            throw error
        }
    }

    static async asyncLogin(loginBody) {
        try {
            const loginResponse = await fetch(`${apiEntry}/getjwt`, {
                method: 'POST',
                body: JSON.stringify(loginBody),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })

            if (!loginResponse.ok) {
                const errorMessage = await loginResponse.text()
                throw errorMessage
            }

            const loginResponseJson = await loginResponse.json()
            const token = this.getToken(loginResponseJson)
            await this.asyncTokenLogin(token)
        } catch (error) {
            throw error
        }
    }

    static async asyncTokenLogin(token) {
        await AsyncStorage.setItem('token', token)
        const navigation = getCurrentNavigation()
        navigation.navigate('Home')
    }

    static async asyncGetToken() {
        return await AsyncStorage.getItem('token')
    }
}