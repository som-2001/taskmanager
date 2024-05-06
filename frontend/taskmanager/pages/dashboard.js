import { Box, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import BasicCard from "@/components/BasicCard";
import SideBar from "@/components/SideBar";
import DraggableDialog from "@/components/DraggableDialog";
import { useEffect, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeTodo, initialBody } from "@/redux/slice";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';


function dashboard() {

    // const [value, setValue] = useState('Todo');
    const [hide, setHide] = useState(false);
    const { body, value } = useSelector(state => state.notes);
    const [responsive, setResponsive] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (newValue) => {

        dispatch(changeTodo(newValue));
    };
    useEffect(() => {
        axios.post('taskmanager-khaki-five.vercel.app/api/getResults', { value: value,userid:localStorage.getItem('userid') }).then(res => {
            dispatch(initialBody(res.data));

        })
    }, [value]);

    useEffect(() => {
        if (window.innerWidth < 600) {
            setResponsive(true);
        } else {
            setResponsive(false);
        }
    }, []);
    return (
        <div style={{ overflowX: "hidden" }}>
            <Grid container spacing={2}>
                <Grid item xs={1} sm={1} md={1} lg={1} sx={{
                    '& .css-mhc70k-MuiGrid-root>.MuiGrid-item': {
                        padding: " 6.33333%"
                    }
                }}>
                    <SideBar />
                   
                    {responsive && <Box sx={{position:"fixed",bottom:"0%",zIndex:1000,marginTop:"40px",backgroundColor:"#3c3c45",width:"100%",height:"10%",marginTop:"100px"}}>
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" sx={{position:"relative",left:"6%"}}>
                        <Tab icon={<LogoutIcon style={{color:"white"}}/>} label="Logout" />
                        <Tab icon={<SpaceDashboardIcon style={{color:"white"}}/>} label="Dashboard" />
                        <Tab icon={<PersonPinIcon style={{color:"white"}} />} label="Account" />
                    </Tabs>
                    </Box>}


                </Grid>
                <Grid item xs={12} sm={11} md={11} lg={11}>
                    <AddCircleIcon style={{ position: "fixed", bottom: "12%", right: "3%", fontSize: "3.5rem", color: "#668ef0", zIndex: 1000 }} onClick={
                        (e) => setHide(!hide)
                    } />
                    <Grid container>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <div style={{ margin: "20px 0px 20px 20px" }}>
                                <TextField
                                    type="text"
                                    placeholder="Search task..."

                                    sx={{
                                        '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root':
                                        {

                                            color: "black",
                                            borderRadius: "12px",
                                            height: "20px",
                                            padding: "29px",
                                            width: { lg: "79rem", xs: "20rem" }
                                        }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <SearchIcon style={{ color: 'black', position: 'relative', right: '5px', marginRight: "5px" }} /> 
                                        )
                                    }}

                                />
                            </div>
                        </Grid>

                    </Grid>

                    <Box sx={{ width: "90vw", height: "30vh", position: "absolute", left: { lg: "7%", xs: "4%",sm:"8%" }, paddingBottom: "50px", backgroundImage: "url('https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148939140.jpg')", borderRadius: "9px" }}>

                    </Box>

                    <Typography varient="p" sx={{ fontSize: "3rem", fontFamily: "math", position: "relative", top: "100px", left: { lg: "2%", xs: "8%" } }}><span style={{ color: "#016cb8" }}>T</span>
                        <span style={{ color: "#016cb8" }}>a</span>
                        <span style={{ color: "#016cb8" }}>s</span>
                        <span style={{ color: "#016cb8" }}>k</span>
                        mate</Typography>

                    {hide && <DraggableDialog />}


                    <Grid container rowSpacing={2} style={{ marginTop: '7rem', padding: "40px",alignItems:"center",alignContent:"center",justifyContent:"center" }}>
                        <Box sx={{
                            width: '105%', marginBottom: "40px"
                        }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                                sx={{
                                    '& .css-heg063-MuiTabs-flexContainer': {
                                        justifyContent: "center",
                                    },

                                }}
                            >
                                <Tab value="Todo" label="Todo" onClick={(e) => handleChange('Todo')} />
                                <Tab value="In Progress" label="In Progress" onClick={(e) => handleChange('In Progress')} />
                                <Tab value="Complete" label="Complete" onClick={(e) => handleChange('Complete')} />
                            </Tabs>
                        </Box>
                        {body && body?.map((data, index) => (
                            
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <BasicCard key={index} item={data} />
                            </Grid>
                        ))}
                        
                    </Grid>

                </Grid>

            </Grid>

        </div>
    )
}

export default dashboard;
