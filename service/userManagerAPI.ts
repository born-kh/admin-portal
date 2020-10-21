import instance from '@utils/instance'
import { SearchTypeParams } from '@interfaces/auth'
import { removeDuplicatesFromArrayByProperty } from '@utils/helpers'

export const searchUsers = async (searchList: SearchTypeParams[]) => {
  try {
    let accounts: any = []
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
