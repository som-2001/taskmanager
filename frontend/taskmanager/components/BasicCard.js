import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Draggable from 'react-draggable'; // Import Draggable
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeBody, deleteBody } from '@/redux/slice';
import { Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel=".MuiCardContent-root"
    >
      <div {...props} />
    </Draggable>
  );
}

export default function BasicCard({ item }) {

  const { body } = useSelector(state => state.notes);
  const dispatch = useDispatch();


  const handleDelete = (e) => {

    dispatch(deleteBody(e));
    axios.post('http://localhost:3001/api/delete', { id: e }).then(res => {
      alert('deleted');
    })
  }

  const InProgress = (e) => {

    console.log(e);
    dispatch(changeBody({ id: e, status: 'In Progress' }));
    axios.post('http://localhost:3001/api/change', { id: e, status: 'In Progress' }).then(res => {
    })

  }
  const Done = (e) => {

    dispatch(changeBody({ id: e, status: 'Complete' }));
    axios.post('http://localhost:3001/api/change', { id: e, status: 'Complete' }).then(res => {

    })
  }
  return (
    <Card sx={{ minWidth: 275, width: "78%", height: "100%", color: "black", borderRadius: "19px", boxShadow: "0px 2px 18px 0px", backgroundImage: `url(${item.background})`, filter:"brightness(0.9)" }} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
      <Box id="draggable-dialog-title" >
        <CardContent style={{ display: "flex" }} >
          <Grid container>
            <Grid item sx={10} lg={10}>
              <Typography sx={{ fontSize: 26}} gutterBottom>
                {item.title}
              </Typography>
            </Grid>
            <Grid item xs={4} lg={2}>
              <AddIcon style={{ fontSize: "1.6rem" }} />
              <ClearIcon style={{ fontSize: "1.6rem" }} onClick={(e) => handleDelete(item._id)} /><br/>
            </Grid>
            <Typography variant="body2">
              {item.date}
              <br />

            </Typography>
          </Grid>

        </CardContent>

        <Box sx={{ margin: "0px 5px 10px 10px", color: "black" }} >
          <CardContent >

            <Typography variant="body2" style={{ marginTop: "1px" }}>
              <span style={{ fontSize: "1.2rem" }}>{item.task}</span>
              <br />
              {item.status === "pending" ?
                <span style={{ color: "red" }}>{item.status}</span> :
                <span style={{ color: "green" }}>{item.status}</span>}

            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant='contained' sx={{ float: "left", backgroundColor: "#FE8622", width: "120px", borderRadius: "30px" }} onClick={(e) => InProgress(item._id)}>In Progress</Button>
            <Button size="small" variant='contained' sx={{ float: "left", backgroundColor: "#FE8622", width: "100px", borderRadius: "30px" }} onClick={(e) => Done(item._id)}>Done</Button>
          </CardActions>
        </Box>
      </Box>
      
    </Card>
  );
}
