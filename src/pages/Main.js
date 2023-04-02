import './../style/main.css'

import React, {useEffect, useState} from 'react'
import {
    AppBar,
    Box, Button,
    Toolbar,
    Typography
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import routes from "../routes";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const drawerWidth = 240;

export const Main = () => {
    const [degree, setDegree] = useState('');
    const [title, setTitle] = useState('');
    const [loader, setLoader] = useState(true);

    const regions = [
        {label: 'Tashkent', value: 'Tashkent'}, {label: 'Namangan', value: 'Namangan'}, {
            label: 'Andijon',
            value: 'Namangan'
        }, {label: 'Bukhara', value: 'Bukhara'}, {label: 'Fergana', value: 'Fergana'}, {
            label: 'Jizzakh',
            value: 'Jizzakh'
        }, {label: 'Xiva', value: 'Jizzakh'}, {label: 'Navoiy', value: 'Navoiy'}, {
            label: 'Qashqadaryo',
            value: 'Qashqadaryo'
        }, {label: 'Samarkand', value: 'Samarkand'}, {label: 'Sirdaryo', value: 'Sirdaryo'}, {
            label: 'Termiz',
            value: 'Termiz'
        }];

    useEffect(() => {
        getDegree('Tashkent')();
        setLoader(false);
    }, [])
    const getDegree = (city) => async () => {
        try {
            const res = await axios.get(routes.getDegree(city));
            const deg = res.data.main.temp - 273;
            setTitle(city)
            setDegree(deg);
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event, value) => {
        getDegree(value.value)();
    }

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    if (loader) return <LinearProgress/>
    return (
        <div >
            <Box  sx={{display: 'flex'}} >
                <CssBaseline   />
                <AppBar
                    position="fixed"
                    sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
                >
                    <Toolbar className = 'header' >
                        <Autocomplete  style={{
                            backgroundColor: "white",
                            borderRadius: "7px",

                        }}
                            disablePortal
                            id="combo-box-demo"
                            options={regions}
                            sx={{width: 300}}
                            value={{label: title,value: title}}
                            disableClearable
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label={title}/>}
                        />
                        <Button  style={{
                            marginLeft: 'auto',
                            backgroundColor: "white",
                            fontWeight: "bold",
                            color: "black",
                            border: "1px solid black"
                        }}
                                 variant="outlined" color="error" onClick={logout}>
                            Log out
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor:"#b2b2df"
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <h1 className='title_w'>Weather</h1>

                    <Divider/>
                    <List className = 'nav-list'>
                        {regions.map((text) => (
                            <ListItem sx={{backgroundColor:"#878db9",marginTop:"0px", marginBottom: "5px"}} key={text.label} disablePadding onClick={getDegree(text.label)}>
                                <ListItemButton>
                                    <ListItemText primary={text.label}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                </Drawer>
                <Box
                    component="main"
                    className='test'
                    sx={{flexGrow: 1, bgcolor: 'background.default', p: 3,}}
                >
                    <Toolbar  />
                    <div className='data' style={{
                        marginLeft:"120px",
                        color: 'black'
                    }}>
                        < Typography  paragraph style={{fontSize: "45px", fontWeight:"bolder",}}>
                            {title && title}
                        </Typography>
                        <Typography  paragraph style={{
                            fontSize: "35px",

                        }}>
                            {degree && degree.toFixed(2) }<span>°C</span>
                        </Typography>
                    </div>
                </Box>
            </Box>
        </div>
    )
}
