import {useReducer,useEffect,forwardRef,FormEvent} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; 
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'   
import CardHeader from '@mui/material/CardHeader'
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
import { AddExperience,UpdateExperience } from 'src/Api/ExperienceService/Experience';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
 
 
const employmentTypes = [
  "Full-time",
  "Part-time",
  "Apprenticeship",
  "Traineeship",
  "Internship", 
  "Contract", 
];

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
    height: 'max-fit-content',    
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
    startDate: new Date(),
    endDate: new Date(),
    responsibilities: [],
    achievements: [],
    skills: [],
    description: '',
    jobTitle: '',
    employmentType:"",
    companyName:'',
    location:""
    
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
  
const AddEdit_ExperienceModal = ({ open, setOpen, dataExperience}: any) => { 
  const [state, dispatch] = useReducer(reducer, initialState); 
 
  useEffect(() => {
    if(dataExperience!=null&& open==true){
      dispatch({ type: 'updateState', payload: dataExperience}); 
    }
  }, [open]);

  const handleClose = () => setOpen(false);

   const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(dataExperience==null){
          console.log(state)
          const response = await AddExperience(state);
          console.log(response);
          dispatch({ type: 'reset' });
          handleClose(); 
        }else{
          console.log(state)
          const response = await UpdateExperience(state);
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
        <Card sx={style} >
        <CardHeader title={dataExperience== null ? 'Add Experience' : 'Update Experience'} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent >
        <form onSubmit={handleSubmit} >
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label='Title'
                value={state.jobTitle}
                placeholder='Ex: Retail Sales Manager'
                onChange={(e) => dispatch({ type: 'jobTitle', payload: e.target.value })}

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
                value={state.companyName}

                onChange={(e) => dispatch({ type: 'companyName', payload: e.target.value })}
                label='Company name'
                placeholder="Ex: Microsoft"
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
              <FormControl fullWidth required>
                <InputLabel id='form-layouts-separator-select-label'>Employment Type</InputLabel>
                <Select
                  label='Employment Type'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  onChange={(e) => dispatch({ type: 'employmentType', payload: e.target.value })}
                  value={state.employmentType}
                >
                  {
                    employmentTypes.map((item)=>
                    <MenuItem value={item}>{item}</MenuItem>) 
                  }
                </Select>
              </FormControl>
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
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Skills</InputLabel>
                <Select
                  multiple
                  value={state.skills}
                  onChange={(event)=> dispatch({ type: 'skills', payload: event.target.value as string[] })}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Language' id='select-multiple-language' />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )} 
                  MenuProps={{
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  }}
                >
                  <MenuItem value='Proficiency in Programming Languages'>Proficiency in Programming Languages</MenuItem>
                  <MenuItem value='Software Development and Lifecycle Management'>Software Development and Lifecycle Management</MenuItem>
                  <MenuItem value='Algorithm Design and Optimization'>Algorithm Design and Optimization</MenuItem>
                  <MenuItem value='Technical Writing'>Technical Writing</MenuItem>
                  <MenuItem value='Social Media Management'>Social Media Management</MenuItem>
                  <MenuItem value='Network Configuration'>Network Configuration</MenuItem>
                  <MenuItem value='Hardware Deployment'>Hardware Deployment</MenuItem>
                  <MenuItem value='Security'>Security</MenuItem>
                  <MenuItem value='Systems and Networks'>Systems and Networks</MenuItem>
                  <MenuItem value='Data Analysis'>Data Analysis</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete multiple options={[]} freeSolo  
               value={state.responsibilities}
               onChange={(event ,newValue) => dispatch({ type: 'responsibilities', payload: newValue})}

                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                          <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                          />
                          ))
                    } 
                      renderInput={(params) => (
                          <TextField
                          {...params}
                          label="Responsibilities"
                          placeholder="responsibilities..."
                          />
                      )}
              />   
           </Grid> 
           <Grid item xs={12}>
            <Autocomplete multiple options={[]} freeSolo  
               value={state.achievements}
               onChange={(event ,newValue) => dispatch({ type: 'achievements', payload: newValue})}

                renderTags={(value, getTagProps) => 
                  value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                        />
                        ))
                  } 
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Achievements"
                        placeholder="achievements..."
                        />
                    )}
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
                value={state.description}
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
              {dataExperience== null ? 'Save' : 'Update'}
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

export default AddEdit_ExperienceModal;

 