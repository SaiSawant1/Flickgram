import { useState } from "react"
import{
    Box,
    IconButton,
    Typography,
    select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    InputBase
} from "@mui/material"

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notification,
    Help,
    Menu,
    Close
} from "@mui/icons-material"

import { useDispatch,useSelector } from "react-redux"
import state, {setMode,setLogout} from "state/index.js"
import { useNavigate } from "react-router-dom"
import FlexBetween from "components/FlexBetween"
const Navbar=()=>{
    const [isMobileMenToogled,setIsMobileMenToogled]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=state.user);
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");

    const theme=useTheme();
    const neutralLight=theme.palette.neutral.light;
    const dark=theme.palette.neutral.dark;
    const background=theme.palette.default;
    const primaryLight=theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const fullName=`${user.firstName} ${user.lastName}`;

    return (

        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color="primary"
                    onClick={()=>navigate("/home")}
                    sx={{
                        "&:hover":{
                            color:primaryLight,
                            cursor:"pointer"
                        },
                    }}
                >
                    Socio
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" rap="3rem" padding="0.1rem 1.5rem">
                            <InputBase placeholder="Search..."/>
                            <IconButton>
                                <Search/>
                            </IconButton>
                    </FlexBetween>
                )}
                {isNonMobileScreens ? 
                    <FlexBetween gap="2rem">
                            <IconButton onClick={()=>dispatch(setMode())}>
                                {theme.palette.mode==="dark"?(<DarkMode sx={{fonSize:"25px"}}/>):(<LightMode sx={{ color:dark, fonSize:"25px"}}/>)}
                            </IconButton>
                            <Message 
                            sx={{fonSize:"25px"}}/>                    
                    </FlexBetween>:<IconButton></IconButton>}
                    </FlexBetween>            
        </FlexBetween>
    )
}
export default Navbar