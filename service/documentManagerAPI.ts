import instance from '@utils/instance'
import { Application, Document, DocumentTypes } from '@interfaces/document-manager'

export const fetchApplicationsByAccount = async (accountID: string) => {
  try {
    const response = await instance.post('/getapplicationsbyaccount', { accountID })
    return response.data.applications as Application[]
  } catch (e) {}
}
export const fetchAnyApplications = async () => {
  try {
    const response = await instance.post('/getapplicationsany', { start: 1, count: 100, filter: {} })
    return response.data.applications as Application[]
  } catch (e) {}
}
export const fetchNewApplications = async () => {
  try {
    const response = await instance.post('/getapplications', { start: 1, count: 100, filter: {} })
    return response.data.applications as Application[]
  } catch (e) {}
}

export const fetchDocuments = async (applicationID: string) => {
  try {
    const response = await instance.post('/getdocuments', { applicationID })
    return response.data.documents as Document[]
  } catch (e) {}
}

export const fetchTypes = async (setID: string) => {
  try {
    const response = await instance.post('/getdocumenttypes', { setID })
    return response.data.types as DocumentTypes[]
  } catch (e) {}
}
