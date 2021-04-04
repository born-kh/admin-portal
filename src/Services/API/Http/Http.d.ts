declare namespace HttpModel {
  export interface IRequestPayload {}
  export interface IRequestResponse {
    id: string
    method: string
    version: number
    error: {
      reason: string
    }
  }
}

export { HttpModel }
