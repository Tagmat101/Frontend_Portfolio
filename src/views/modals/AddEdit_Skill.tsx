import {useEffect,useReducer,forwardRef,FormEvent} from 'react'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select';
import { 
  Autocomplete,
  Chip,
  OutlinedInput,
} from '@mui/material'
// ** Icons Imports 
import EmailOutline from 'mdi-material-ui/EmailOutline' 
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { Briefcase, MapMarker } from 'mdi-material-ui';
import DatePicker from 'react-datepicker' 
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AddSkill,UpdateSkill } from '@api/SkillServices/Services';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem'; 
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'   
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
    width: '90%',  
    boxShadow: 24,
    overflow: 'auto',
    p: 2, 
    '@media (min-width:600px)': {
      width: '80%',   
    },
    '@media (min-width:960px)': {
      width: 700,   
    },
  }; 
 
  
  const initialState = { 
    name: "",
    icon: "", 
    category:"",
    type:""
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'reset':
        return initialState;
      case 'updateState':
          return { ...state, ...action.payload };
      default:
        console.log(action.type+" "+action.payload )
        if (action.type in state) {
          return { ...state, [action.type]: action.payload };
        } else {
          throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
  }
export default function AddEdit_Skill({ open, setOpen, dataSkill}: any) {
  const [state, dispatch] = useReducer(reducer, initialState); 
 
  useEffect(() => {
    if(dataSkill!=null && open==true){
      console.log("dataSkill")
      dispatch({ type: 'updateState', payload: dataSkill}); 
    }
  }, [open]);

  const handleClose = () => setOpen(false);
   const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(dataSkill==null){ 
          const response = await AddSkill(state); 
          dispatch({ type: 'reset' }); 
        }else{
          const response = await UpdateSkill(state);
          dispatch({ type: 'reset' }); 
        }
        handleClose(); 
        window.location.reload(); 
  };
  
  return (
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Card sx={style} >
      <CardHeader title={dataSkill== null ? 'Add Skill' : 'Update Skill'} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label='Skill Name' 
                onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
                value={state.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Briefcase />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label='Skill type' 
                onChange={(e) => dispatch({ type: 'type', payload: e.target.value })}
                value={state.type}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Briefcase />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label='Skill category' 
                onChange={(e) => dispatch({ type: 'category', payload: e.target.value })}
                value={state.category}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Briefcase />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth 
                value={state.icon}
                onChange={(e) => dispatch({ type: 'icon', payload: e.target.value })}
                label='icon' 
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
              <Button type='submit' variant='contained' size='large'  sx={{ marginRight: 2 }} >
              {dataSkill== null ? 'Save' : 'Update'}
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
