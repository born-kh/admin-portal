import instance from '@utils/instance'

export const fetchApplicationsByAccount = async (accountID: string) => {
  try {
    const response = await instance.post('/getapplicationsbyaccount', { accountID })
    return response.data.applications
  } catch (e) {}
}
