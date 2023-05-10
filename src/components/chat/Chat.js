import { Button, Container, TextField, Grid, Avatar, Box, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useRef, useEffect } from "react";
import {serverTimestamp, collection, addDoc, orderBy, query, getFirestore} from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from "react-router-dom";
import { getAuth } from 'firebase/auth';

const Chat = () => {

    const db = getFirestore();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [value, setValue] = useState("");
    const bottomRef = useRef(null);

    // If it is private chat, so it has ID and we use it to get messages
    const {id} = useParams();
    const messRef = id 
                        ? collection(db, 'privateChats', id, 'messages') 
                        : collection(db, "messages");

    const [messages] = useCollectionData(
        query(messRef, orderBy('createdAt'))
    );

    useEffect(() => {
            //  scroll to bottom every time new message added
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages])

    const chatContent = messages 
        ? messages.map(message => {
            return (
                <Box 
                    key={message.createdAt}
                    sx={{
                    margin: "10px", 
                    ml: user.uid === message.uid ? 'auto' : '10px',
                    maxWidth: '60%',
                    padding: '5px',
                    overflowWrap: "break-word"
                    }}
                    ref={bottomRef}
                >
                    <Grid
                        container
                        sx={{
                            justifyContent: 'flex-start',
                            flexDirection: user.uid === message.uid ? 'row-reverse' : 'row',
                            alignItems: 'center'}}
                    >
                        <Avatar 
                            src={message.photoURL}
                            alt={user.displayName}
                            sx={{ width: 24, 
                                height: 24,
                                mr: user.uid === message.uid ? 0 : '7px',
                                ml: user.uid === message.uid ? '7px' : 0
                            }}
                        />
                        <Typography
                            sx={{fontWeight: 500,
                            }}
                        >
                            {message.displayName}
                        </Typography>
                    </Grid>
                    <Box
                        sx={{textAlign: user.uid === message.uid ? 'end' : 'start'}}
                    >
                        {message.text}
                    </Box>
                </Box>
            )
        })
        : null;

    const sendMessage = async () => {
        
        await addDoc(messRef, {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: serverTimestamp()
        });
        setValue('');
    };

    return (
        <Container>
            {
                id 
                    ? <Typography 
                        variant="h6"
                        sx={{textAlign: 'center', mt: '20px'}}
                      >
                        Chat name: {id}
                      </Typography>
                    : null
            }
            <Grid 
                sx={{heigth: window.innerHeight - 50, width: '100%', mt: '20px'}}
                container
                justifyContent={'center'}
                alignContent={'center'}
            >
                <Box 
                    sx={{
                        width: '80%', 
                        height: '70vh', 
                        border: '1px solid #374785',
                        borderRadius: '2px', 
                        overflowY: 'auto'}}
                >
                    {chatContent}
                </Box>
                <Grid 
                    container
                    sx={{
                        width: "80%", 
                        mt: '10px', 
                        justifyContent: 'space-between',
                    }}
                >
                    <TextField 
                        variant="outlined"
                        maxRows={2}
                        sx={{width: '79%'}}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
                    />
                    <Button 
                        variant="outlined"
                        sx={{width: '20%',  bgcolor: '#EDC7B7'}}
                        onClick={sendMessage}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Chat;

