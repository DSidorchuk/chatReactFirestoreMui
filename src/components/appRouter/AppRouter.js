import {  Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from '../login/Login';
import Chat from '../chat/Chat';
import NotLoggedUser from '../notLoggedUser/NotLoggedUser';
import LoggedUserMenu from '../loggedUserMenu/LoggedUserMenu';

const AppRouter = () => {

    const auth = getAuth();
    const [user] = useAuthState(auth);

    return (
            <Routes>
                <Route path="/" element={user ? <LoggedUserMenu/> : <NotLoggedUser/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/chat' element={<Chat/>}/>
                <Route path='/privateChat/:id' element={<Chat/>}/>
            </Routes>
    )
}

export default AppRouter;