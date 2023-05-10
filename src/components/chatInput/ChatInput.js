import { NavLink} from 'react-router-dom';
import { Grid, Button, TextField } from "@mui/material";
import { useState } from 'react';

const PrivateChatSearch = ({btnName, btnFunction}) => {

    const [value, setValue] = useState('');
    const [warning, setWarning] = useState('');

    return (
        <Grid
            container
            sx={{
                justifyContent: 'center',
                
            }}
        >
            <TextField
                required
                size='small'
                id="outlined-helperText"
                label="Chat name"
                helperText={warning}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <Button
                onClick={() => btnFunction(value, setWarning)}
            >
                {btnName}
            </Button>
        </Grid>
    )
}

export default PrivateChatSearch;