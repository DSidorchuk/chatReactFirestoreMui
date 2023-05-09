import { Box, AppBar, Toolbar, Button, Typography} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { Context } from "../..";


const Navbar = () => {

    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CHAT
                        </Typography>
                            { user ?
                                <Button color="inherit" 
                                        variant="outlined"
                                        onClick={() => auth.signOut()}>
                                    Log out
                                </Button>
                             :
                                <NavLink to='/login'>
                                    <Button color="inherit" variant="outlined">Login</Button>
                                </NavLink>
                            }
                    </Toolbar>
                </AppBar>

        </Box>
    )
}

export default Navbar;