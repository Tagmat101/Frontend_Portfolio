import {useReducer,useEffect,forwardRef} from 'react';
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
import { MapMarker, School } from 'mdi-material-ui';
import DatePicker from 'react-datepicker'
import { AddEducation,UpdateEducation } from 'src/Api/EducationService/Education';

  type CustomInputProps = {
    label: string;
    // other props...
  };
  const CustomInput = forwardRef<unknown, CustomInputProps>((props, ref) => {
    const { label, ...otherProps } = props;
    return <TextField fullWidth {...otherProps} inputRef={ref} label={label} autoComplete='off' />;
  });
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700, 
    height: 'max-fit-content',   
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
      case 'updateState':
          return { ...state, ...action.payload };  
      default:
        if (action.type in state) {
          return { ...state, [action.type]: action.payload };
        } else {
          throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
  }
  
const AddEdit_EducationModal = ({ open, setOpen ,dataEducation}: any) => { 
  const [state, dispatch] = useReducer(reducer, initialState); 
 
  useEffect(() => {
    if(dataEducation!=null&& open==true){
      dispatch({ type: 'updateState', payload: dataEducation});

    }
  }, [open]);
  const handleClose = () => setOpen(false);

   const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(dataEducation==null){
          console.log(state)
          const response = await AddEducation(state);
          console.log(response);
          dispatch({ type: 'reset' });
          handleClose(); 
        }else{
          console.log(state)
          const response = await UpdateEducation(state);
          console.log(response);
          dispatch({ type: 'reset' });
          handleClose(); 
        }
       
  };

  return (
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
      <CardHeader title={dataEducation == null ? 'Add Education' : 'Update Education'} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='School'
                placeholder='Ex: Boston University'
                onChange={(e) => dispatch({ type: 'institution', payload: e.target.value })}
                value={state.institution}
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
                value={state.degree}
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
                value={state.fieldOfStudy}
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
            <Grid item xs={12}>
              <TextField
                fullWidth 
                value={state.location}
                label='Location'
                placeholder='Ex: London, United Kingdom'
                onChange={(e) => dispatch({ type: 'location', payload: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MapMarker />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>   
            <Grid item xs={12} sm={6}>
              <DatePicker 
                selected={new Date(state.startDate)} 
                maxDate={new Date(state.endDate)}
                showYearDropdown
                showMonthDropdown  
                customInput={<CustomInput label="Start date"/>}
                onChange={(date) => dispatch({ type: 'startDate', payload: date})}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker 
                selected={new Date(state.endDate)} 
                minDate={new Date(state.startDate)}
                showYearDropdown
                showMonthDropdown  
                customInput={<CustomInput label="End date"/>}
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
                value={state.description}
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
            {dataEducation== null ? 'Save' : 'Update'}
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

export default AddEdit_EducationModal;

 