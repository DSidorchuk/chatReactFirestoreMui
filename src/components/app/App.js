import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, Container } from '@mui/material';
import Navbar from '../navbar/Navbar';
import {theme} from '../theme';
import AppRouter from '../appRouter/AppRouter';
import '../../style/style.scss';


const App = () => {

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Container>
                    <Navbar/>
                    <AppRouter/>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App;