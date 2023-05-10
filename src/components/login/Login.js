import { Grid, Box, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';

const Login = () => {

    const auth = getAuth();
    const navigateToMain = useNavigate();

    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            navigateToMain('/');
          }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
    }

    return (
        <Grid container
            style={{height: window.innerHeight - 200}}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Grid style={{width: 400}}
                container
                justifyContent={'center'}
                alignContent={'center'}
            >
                <Box p={5} >
                    <Button variant="outlined" onClick={login}>Login with Google</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login;