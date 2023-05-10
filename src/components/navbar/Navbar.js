import { Box, AppBar, Toolbar, Button, Typography} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';


const Navbar = () => {

    const auth = getAuth();
    const [user] = useAuthState(auth);
    const goToMain = useNavigate();

    const logOut = () => {
        auth.signOut();
        goToMain('/');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ flexGrow: 1, color: '#AC3B61', fontWeight: '700',
                             }}
                        >
                        CHAT
                        </Typography>
                            { user ?
                                <Button color="inherit" 
                                        variant="outlined"
                                        onClick={logOut}
                                        sx={{color: '#EDC7B7'}}
                                >
                                    Log out
                                </Button>
                             :
                                <NavLink to='/login'>
                                    <Button 
                                        color="inherit" 
                                        variant="outlined"
                                        sx={{color: '#EDC7B7'}}
                                    >
                                        Login
                                    </Button>
                                </NavLink>
                            }
                    </Toolbar>
                </AppBar>
        </Box>
    )
}

export default Navbar;