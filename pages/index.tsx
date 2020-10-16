import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { wrapper } from 'store'
import { RootState } from '@store/reducers'
import { USER_LOGIN } from '@store/auth/types'

const Page: NextPage = () => {
  const { auth } = useSelector<RootState, RootState>((state) => state)

  console.log(auth)
  return <div></div>
}

export default Page
