
import { useDispatch} from 'react-redux'
import { logout } from '../../features/auth/authSlice';

const Logout = () => {
    const dispatch = useDispatch() ;
    const handleLogout = ()=>{
        dispatch(logout())
    }
  return (
    <>
    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Logout