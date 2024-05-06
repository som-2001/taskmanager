import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { TextField } from '@mui/material';
import axios from 'axios';
import { setBody } from '@/redux/slice';
import { useDispatch } from 'react-redux';
// import {toast,toastContainer} from 'sonner';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [task, setTask] = React.useState('');


  const dispatch=useDispatch();

  const handleClose = () => { 
    window.location.reload();
    setOpen(false);
  };

  const handleSubmit = () => {
    
    var background=['https://plus.unsplash.com/premium_vector-1712694179179-f18fd818419d?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlrZXN8ZW58MHx8MHx8fDA%3D','https://plus.unsplash.com/premium_vector-1711987582179-5a4fdb1711d5?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlrZXN8ZW58MHx8MHx8fDA%3D','https://plus.unsplash.com/premium_vector-1713941732591-60e71e84560b?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlrZXN8ZW58MHx8MHx8fDA%3D','https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpa2VzfGVufDB8fDB8fHww','https://plus.unsplash.com/premium_photo-1683275025970-dd2db5e4c84d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGxpa2VzfGVufDB8fDB8fHww'];
    var backgroundgenerator=background[Math.floor(Math.random()*background.length)];
    var date=new Date();
    var year=date.getFullYear();
    var day=date.getDate();
    const month=['jan','feb','mar','apr','may','june','july','aug','sept','oct','nov','dec'];
    const currentdate=`${month[date.getMonth()]} ${day},${year}`;
    dispatch(setBody({ title:title, task:task,date:currentdate,status:'Todo',background:backgroundgenerator }))


    axios.post('taskmanager-lyart.vercel.app/api/save', { title:title, task:task,userid:localStorage.getItem('userid') })
      .then(res => {
        console.log('Data added successfully:', res.data);
      })
      .catch(error => {
        console.error('Error adding data:', error);
      });
  };
  
  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{
          '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper ':{
            width:{lg:"28%",xs:"70%"},
            textAlign:"center"
          }
        }}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Your Task
        </DialogTitle>
        <DialogContent sx={{width:"100%"}}>
          <DialogContentText>
           <TextField
           type='text'
           label='Title'
           required
           sx={{
            mb:'5px',
            width:"100%"
           }}
           onChange={(e)=>setTitle(e.target.value)}
           /><br/>
          <TextField
           type='text'
           label='Task'
           multiline
           rows={4}
           onChange={(e)=>setTask(e.target.value)}
           sx={{
            width:"100%"
           }}
           required
           />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
