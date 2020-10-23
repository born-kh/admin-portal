import instance from '@utils/instance'

import { removeDuplicatesFromArrayByProperty } from '@utils/helpers'
import { SearchTypeParams, Account } from 'interfaces/user-manager'

export const searchUsers = async (searchList: SearchTypeParams[]) => {
  try {
    let accounts: Account[] = []
    for (let params of searchList) {
      const responseSearchUser = await instance.post('/searchuser', params)
      if (responseSearchUser.status === 200) {
        accounts = accounts.concat(responseSearchUser.data.accounts)
      }
    }
    accounts = removeDuplicatesFromArrayByProperty(accounts, 'accountID')

    return accounts
  } catch (e) {}
}
export const getAccountSessions = async (accountID: string) => {
  const response = await instance.post('/getaccountsessions', { accountID })
  return response.data.sessions
}
