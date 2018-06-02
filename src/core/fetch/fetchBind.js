import { fetchHandler } from './fetchHandler'


export function fetchBind(payload: FetchStartPayload) {
    return new Promise((resolve, reject) => {
        const promisePayload = { ...payload }

        promisePayload.success = resolve
        promisePayload.error = reject

        fetchHandler(promisePayload)
    })
}