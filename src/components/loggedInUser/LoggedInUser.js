import { NavLink} from 'react-router-dom';
import { Grid, Button, Typography, TextField } from "@mui/material";
import { setDoc, getFirestore, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PrivateChatSearch from './PrivateChatSearch';

const LoggedInUser = () => {

    const db = getFirestore();
    const goToNewChat = useNavigate();


    const createChat = async (name, setWarning) => {  

        const workChatName = name.replaceAll(' ', '')
        const regexp = /\W/i;

        if (!regexp.test(workChatName)) {
            const chatRef  = doc(db, 'privateChats', workChatName);
            const docSnap = await getDoc(chatRef);
            if (docSnap.exists()) {
                setWarning('Please choose another name')
            } else {
                await setDoc(chatRef, {createdAt: serverTimestamp()});
                goToNewChat(`/privateChat/${workChatName}`)
            }
        } else {
            setWarning('Please use in name letters a-z, digits 0-9');
        }

    }

    const checkChatName = async (name, setWarning) => {

        const workChatName = name.replaceAll(' ', '')
        const regexp = /\W/i;

        if (!regexp.test(workChatName)) {
            const chatRef  = doc(db, 'privateChats', workChatName);
            const docSnap = await getDoc(chatRef);
            if (docSnap.exists()) {
                goToNewChat(`/privateChat/${workChatName}`)
            } else {
                setWarning('There isn`t chat with such name');
            }
        } else {
            setWarning('Please use in name letters a-z, digits 0-9');
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
                sx={{mb: '30px', textTransform: "uppercase"}}
            >
                At this app you can
            </Typography>
            <NavLink to='/chat'>
                <Button variant='outlined'>
                    enter chat
                </Button>
            </NavLink>
            <Typography>or</Typography>
            <PrivateChatSearch btnName='create chat' btnFunction={createChat}/>
            <Typography>or</Typography>
            <PrivateChatSearch btnName='search chat' btnFunction={checkChatName}/>
        </Grid>
    )
}

export default LoggedInUser;