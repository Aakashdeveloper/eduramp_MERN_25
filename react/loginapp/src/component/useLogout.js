import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate()

    const handleLogout = useCallback(() => {
        sessionStorage.removeItem('ltk')
        sessionStorage.removeItem('rtk')
        navigate('/')
    },[navigate])

    return handleLogout

}

export default useLogout;