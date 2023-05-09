import { NavLink} from 'react-router-dom';
import { Button, Typography, Box} from "@mui/material";

const NotLoggedInUser = () => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                mt: "50px", 
                height: 150
            }}
        > 
            <Typography 
                variant="h6" 
                component="div"
                sx={{textAlign: 'center'}} 
            >
                For chat, please, follow next link and log in:
            </Typography>
            <NavLink to='/login'>
                <Button variant='contained'>
                    Go to log in
                </Button>
            </NavLink>
        </Box>
    )
}

export default NotLoggedInUser;