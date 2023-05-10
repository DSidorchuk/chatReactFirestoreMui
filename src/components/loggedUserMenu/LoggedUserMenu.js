import { NavLink} from 'react-router-dom';
import { Grid, Button, Typography } from "@mui/material";
import { setDoc, getFirestore, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import ChatInput from '../chatInput/ChatInput';

const LoggedUserMenu = () => {

    const db = getFirestore();
    const goToNewChat = useNavigate();

    const validateChatName = (name, warningFunc) => {
        const workChatName = name.replaceAll(' ', '')
        const regexp = /\W/i;

        if (!regexp.test(workChatName)) {
            return workChatName;
        } else {
            warningFunc('Please use in name letters a-z, digits 0-9');
            return false;
        }

    }

    const createChat = async (name, setWarning) => {  

        const workChatName = validateChatName(name, setWarning);

        if (workChatName) {
            const chatRef  = doc(db, 'privateChats', workChatName);
            const docSnap = await getDoc(chatRef);

            if (docSnap.exists()) {
                setWarning('Please choose another name')
            } else {
                await setDoc(chatRef, {createdAt: serverTimestamp()});
                goToNewChat(`/privateChat/${workChatName}`)
            }
        } 
    }

    const checkChatName = async (name, setWarning) => {

        const workChatName = validateChatName(name);

        if (workChatName) {
            const chatRef  = doc(db, 'privateChats', workChatName);
            const docSnap = await getDoc(chatRef);
            if (docSnap.exists()) {
                goToNewChat(`/privateChat/${workChatName}`)
            } else {
                setWarning('There isn`t chat with such name');
            }
        } 
    }

    return (
        <Grid 
            container
            sx={{flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                mt: '50px',
                height: '300px'
                
            }}
        >
            <Typography
                variant='h5'
                sx={{mb: '30px', textTransform: "uppercase", color: '#123C69'}}
            >
                At this app you can
            </Typography>
            <NavLink to='/chat'>
                <Button 
                    variant='outlined'
                    sx={{width: '323px'}}
                >
                    enter chat
                </Button>
            </NavLink>
            <Typography sx={{color: '#AC3B61'}}>or</Typography>
            <ChatInput 
                btnName='create chat' 
                btnFunction={createChat}
            />
            <Typography sx={{color: '#AC3B61'}}>or</Typography>
            <ChatInput 
                btnName='search chat' 
                btnFunction={checkChatName}
            />
        </Grid>
    )
}

export default LoggedUserMenu;