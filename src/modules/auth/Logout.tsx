import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as auth from './redux/AuthRedux'

export function Logout() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(auth.actions.logout())
    window.location.href = '/auth/login'
  }, [dispatch])

  return null
}
