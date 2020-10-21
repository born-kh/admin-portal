import React, { useEffect } from 'react'

import Router, { useRouter } from 'next/router'

export default function () {
  const router = useRouter()
  useEffect(() => {
    router.push('/user-manager')
  }, [])
  return <React.Fragment></React.Fragment>
}
