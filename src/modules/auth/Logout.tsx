import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as auth from './redux/AuthRedux'
import { useRouter } from 'next/router'
export function Logout() {

  const dispatch = useDispatch()
  useEffect(() => {
    debugger
    const router = useRouter();
    sessionStorage.removeItem("token");
    dispatch(auth.actions.logout())
    router.push('/auth/login');
  }, [dispatch])

  return null
}
