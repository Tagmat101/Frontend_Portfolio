import {useReducer,useEffect,forwardRef,FormEvent, useContext} from 'react';
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
import { AddExperience,UpdateExperience } from '@api/ExperienceServices/Service';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DetailsPortfolioContext } from 'src/@core/context/PortfolioDetailsContext';
import { useSkill } from '@hooks/useDetails';
 
 
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
          console.log(JSON.stringify(state.skills) )
          return { ...state, [action.type]: action.payload };
        } else {
          throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
  }
  
const AddEdit_ExperienceModal = () => { 
  const [state, dispatch] = useReducer(reducer, initialState); 
  const {dataExperienceMod, setDataExperienceMod,openExperience,setOpenExperience} = useContext(DetailsPortfolioContext); 
  const { skillList} = useSkill();

  useEffect(() => {
    if(dataExperienceMod!=null && openExperience==true){
      dispatch({ type: 'updateState', payload: dataExperienceMod});
    } 
  }, [openExperience]);
  
  const handleClose = ()=>{
    dispatch({ type: 'reset' }); 
     setDataExperienceMod(null);
     setOpenExperience(false);
  };


   const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(dataExperienceMod==null){
          console.log(state)
          const response = await AddExperience(state);
          console.log(response);
          dispatch({ type: 'reset' }); 
        }else{
          console.log(state)
          const response = await UpdateExperience(state);
          console.log(response);
          dispatch({ type: 'reset' });
        }
        handleClose(); 
        window.location.reload();

  };
  
  return (
   
      <Modal
        open={openExperience}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} >
        <CardHeader title={dataExperienceMod== null ? 'Add Experience' : 'Update Experience'} titleTypographyProps={{ variant: 'h6' }} />
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
                  value={state.skills.map((skill:ISkill) => skill.id)} // Assuming state.skills is an array of skill objects with an 'id' property
                  onChange={(event) => {
                    const selectedSkillIds = event.target.value as string[];   
                    const selectedSkills = skillList.filter(skill => selectedSkillIds.includes(skill.id));
                    dispatch({ type: 'skills', payload: selectedSkills });
                  }}                 
                  id='form-layouts-separator-multiple-select'   
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Language' id='select-multiple-language' />}
                  renderValue={(selected) => { 
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((skillId: string) => {
                          const skill = skillList.find(skill => skill.id === skillId);
                          return (
                            <Chip key={skillId} label={skill ? skill.name : 'Unknown Skill'} />
                          );
                        })}
                    </Box>
                    );
                  }}
                  MenuProps={{
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  }}
                >
                  {
                    skillList?.map((skill, index) => (
                      <MenuItem key={index} value={skill.id}>{skill.name}</MenuItem>
                    ))
                  }
            
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
              {dataExperienceMod== null ? 'Save' : 'Update'}
              </Button>
              <Button onClick={()=>setOpenExperience(false)} variant='contained' sx={{ bgcolor: 'red', '&:hover': {backgroundColor: 'darkred'}}} size='large'>
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


 