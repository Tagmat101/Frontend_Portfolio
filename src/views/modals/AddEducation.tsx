import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; 
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid' 
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { School } from 'mdi-material-ui';
import DatePicker from 'react-datepicker'
import { AddEducation } from 'src/Api/POST/POSTEducation';

  type CustomInputProps = {
    label: string;
    // other props...
  };
  const CustomInput = React.forwardRef<unknown, CustomInputProps>((props, ref) => {
    const { label, ...otherProps } = props;
    return <TextField fullWidth {...otherProps} inputRef={ref} label={label} autoComplete='off' />;
  });
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700, 
    height: 800,  
    boxShadow: 24,
    p: 2,
  };
  
  const initialState = {
    degree: '',
    startDate: new Date(),
    endDate: new Date(),
    fieldOfStudy: '',
    location: '',
    description: '',
    institution:''
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'reset':
        return initialState;
      default:
        if (action.type in state) {
          return { ...state, [action.type]: action.payload };
        } else {
          throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
  }
  
const AddEducationModal = ({ open, setOpen }: any) => { 
  const [state, dispatch] = React.useReducer(reducer, initialState); 
 
  const handleClose = () => setOpen(false);

   const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
          console.log(state)
            const response = await AddEducation(state);
            console.log(response);
            dispatch({ type: 'reset' });
            handleClose(); 
  };

  return (
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
      <CardHeader title='Add Education' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='School'
                placeholder='Ex: Boston University'
                onChange={(e) => dispatch({ type: 'institution', payload: e.target.value })}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <School />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth 
                onChange={(e) => dispatch({ type: 'degree', payload: e.target.value })}
                label='Degree'
                placeholder="Ex: Bachelor's"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth 
                label='Field of study'
                placeholder='Ex: Business'
                onChange={(e) => dispatch({ type: 'fieldOfStudy', payload: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker 
                selected={state.startDate} 
                maxDate={state.endDate}
                showYearDropdown
                showMonthDropdown  
                customInput={<CustomInput label="Start date"/>}
                onChange={(date) => dispatch({ type: 'startDate', payload: date})}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker 
                minDate={state.startDate}
                showYearDropdown
                showMonthDropdown 
                selected={state.endDate} 
                customInput={<CustomInput label="End date (or expected)"/>}
                onChange={(date) => dispatch({ type: 'endDate', payload: date })} 

                id='form-layouts-separator-date' 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Description'
                placeholder='Description'
                onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} 

                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <Button type='submit' variant='contained' size='large'  sx={{ marginRight: 2 }} >
                Save
              </Button>
              <Button onClick={()=>setOpen(false)} variant='contained' sx={{ bgcolor: 'red', '&:hover': {backgroundColor: 'darkred'}}} size='large'>
                Close
              </Button> 
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
      </Modal>
    
  );
}

export default AddEducationModal;

 