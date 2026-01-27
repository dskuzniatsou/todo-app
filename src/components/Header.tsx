import {Typography, Container, Box} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from "../NuvButton.ts";

type Props = {
    themeMode: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header = ({themeMode, toggleTheme}: Props) => {
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
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
                           {themeMode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
                       </IconButton>
                       <NavButton variant='outlined'>Sign in</NavButton>
                       <NavButton>Sign up</NavButton>
                       <Button color="inherit" variant='outlined'>Sign in</Button>
                   </Box>

                </Container>
            </Toolbar>
        </AppBar>
    );
};
