import { useRouter } from 'next/router'
import Dashboard from '@components/Dashboard'

export default function () {
  const router = useRouter()
  const { id } = router.query
  return (
    <Dashboard>
      <h1>{id}</h1>
    </Dashboard>
  )
}
