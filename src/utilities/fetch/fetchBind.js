import { fetchHandler } from './fetchHandler'
import { AuthHelper } from '../auth'

interface FetchStartPayload {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: any,
    headers: Headers
}

interface FetchHelperProps {
    onStart: (payload: FetchStartPayload) => Promise<FetchStartPayload>,
    onSuccess: (response, payload: FetchStartPayload) => void,
    onError: (error) => void,
    onCompleted: () => void
}

export class FetchHelper {
    static initFetchHelperProps: FetchHelperProps = {
        onStart: async (payload) => {
            const newPayload = { ...payload }
            const token = await AuthHelper.asyncGetToken()

            if (token) {
                const authBearer = token && `Bearer ${token}`
                if (!newPayload.headers)
                    newPayload.headers = new Headers()

                newPayload.headers.set('authorization', authBearer)
            }

            return newPayload
        }
    }

    static async asyncStart(payload: FetchStartPayload) {
        const { onStart, onSuccess, onError, onCompleted } = this.initFetchHelperProps

        try {
            const fetchStartPayload = onStart ? await onStart(payload) : payload
            const response: Response = await fetchHandler(fetchStartPayload)
            onSuccess && onSuccess(response, fetchStartPayload)
            return await response.json
            
        } catch (error) {
            onError && onError(error)
            throw error
        }
        finally {
            onCompleted && onCompleted()
        }
    }
}