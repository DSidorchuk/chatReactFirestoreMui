import {  Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from '../login/Login';
import Chat from '../chat/Chat';
import PrivateChat from '../privateChat/PrivateChat';
import NotLoggedInUser from '../notLoggedInUser/NotLoggedInUser';
import LoggedInUser from '../loggedInUser/LoggedInUser';

const AppRouter = () => {

    const auth = getAuth();
    const [user] = useAuthState(auth);

    return (
            <Routes>
                <Route path="/" element={user ? <LoggedInUser/> : <NotLoggedInUser/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/chat' element={<Chat/>}/>
                <Route path='/privateChat/:id' element={<PrivateChat/>}/>
            </Routes>
    )
}

export default AppRouter;