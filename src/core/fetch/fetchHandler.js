function getToken() {
    return ''
}

export async function fetchHandler(payload) {
    try {
        const token = getToken()
        const authBearer = token && `Bearer ${token}`

        const headers = payload.headers

        if (payload.noAuth !== true)
            headers['Authorization'] = authBearer

        payload.requestInit = {
            method: payload.method,
            headers: new Headers(headers)
        }

        if (payload.data instanceof FormData)
            payload.requestInit.body = payload.data
        else {
            if (!headers['Content-Type'])
                headers['Content-Type'] = 'application/json'

            payload.requestInit.body = JSON.stringify(payload.data)
        }

        const response: Response = await fetch(payload.url, payload.requestInit)

        if (response.ok) {
            let responseValue

            const contentType = response.headers.get('content-Type')
            if (contentType) {
                if (contentType.includes('application/json')) {
                    responseValue = await response.text()
                    responseValue = JSON.parse(responseValue)
                }
            }

            payload.success && payload.success(responseValue || response)
        }
        else
            throw response
    } catch (response /**type Response*/) {
        payload.error && payload.error(response)
    }
    finally {
        payload.complete && payload.complete()
    }
}