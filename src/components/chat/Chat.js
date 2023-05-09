import { Button, Container, TextField, Grid, Avatar, Box, Typography } from "@mui/material";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useState } from "react";
import {serverTimestamp, collection, addDoc, orderBy, query} from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Chat = () => {

    const {auth, db} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState("");
    const messRef = collection(db, "messages");
    const [messages] = useCollectionData(
        query(messRef, orderBy('createdAt'))
    );

    const chatContent = messages 
        ? messages.map(message => {
            return (
                <Box 
                    key={message.uid}
                    sx={{
                    margin: "10px", 
                    ml: user.uid === message.uid ? 'auto' : '10px',
                    maxWidth: '60%',
                    padding: '5px',
                    overflowWrap: "break-word"
                    }}
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
            <Grid 
                sx={{heigth: window.innerHeight - 50, width: '100%', mt: '30px'}}
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
                    />
                    <Button 
                        variant="outlined"
                        sx={{width: '20%'}}
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