import {Typography, Container, Box} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header = ({mode, toggleTheme}: Props) => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Container maxWidth={'lg'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'  }}>
                    <Box  sx={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div">
                            Todo App
                        </Typography>
                    </Box>
                   <Box sx={{display: 'flex', flexDirection: 'row',gap: '10px', justifyContent: 'space-between'}} >
                       <IconButton color="inherit" onClick={toggleTheme}>
                           {mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
                       </IconButton>
                       <Button color="inherit" variant='outlined'>Sign in</Button>
                   </Box>

                </Container>
            </Toolbar>
        </AppBar>
    );
};
