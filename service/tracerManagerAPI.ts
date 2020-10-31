import instance from '@utils/instance'
import { SearchTypeParams } from '@interfaces/user-manager'
import { Tracer, TracerSearchParamsType } from '@interfaces/tracer-manager'
import { tracerAPI } from './api'

export const searchTracers = async (params: TracerSearchParamsType) => {
  try {
    const response = await tracerAPI.searchTracer(params)

    var array: any = response.data
    var arrayObj: any[] = []
    var errors: Tracer[] = []

    var messages: Tracer[] = []

    for (let item of array) {
      let rawPayload = item.payload.string.replace('', '')
      let payload = JSON.parse(rawPayload)
      let newItem = {
        ts: item.ts,
        account_id: item.account_id,
        session_id: item.session_id,
        response: { id: '' },
        request: { id: '' },
      }

      if (payload.params) {
        const index = arrayObj.findIndex((e: any) => e.response.id.toLowerCase() === payload.id.toLowerCase())
        newItem = { ...newItem, request: payload }

        if (index < 0) {
          arrayObj.push(newItem)
        } else {
          arrayObj[index] = { ...arrayObj[index], request: payload }
        }
      } else {
        const index = arrayObj.findIndex((e: any) => e.request.id.toLowerCase() === payload.id.toLowerCase())
        newItem = { ...newItem, response: payload }

        if (index < 0) {
          arrayObj.push(newItem)
        } else {
          arrayObj[index] = { ...arrayObj[index], response: payload }
        }
      }
    }

    for (let item of arrayObj) {
      if (item.response.error) {
        errors.push(item)
        // accountId = item.account_id
      } else if (item.response.result) {
        messages.push(item)
      }
    }

    return { messages, errors }
  } catch (e) {
    console.log(e)
  }
}
