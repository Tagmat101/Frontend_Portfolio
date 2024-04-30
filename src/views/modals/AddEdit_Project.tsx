import {useReducer,useState,useEffect,forwardRef,FormEvent, useContext} from 'react';
import Box from '@mui/material/Box'; 
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; 
import Card from '@mui/material/Card' 
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'; 
 
import { Button, Grid, Typography,Autocomplete,Chip,OutlinedInput } from '@mui/material';

 
import { Briefcase, EmailOutline, CloseCircle, MessageOutline } from 'mdi-material-ui';
import DatePicker from 'react-datepicker' 
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AddProject,UpdateProject } from '@api/ProjectServices/Services';
import { DetailsPortfolioContext } from 'src/@core/context/PortfolioDetailsContext';
   

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
    link: "",
    name: "",
    description: "",
    achievements: [],
    skills: [], 
    startDate: new Date(),
    endDate:new Date(),
    responsibilities:[],  
    images:[]
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
  
const AddEdit_ProjectModal = () => { 
  const [state, dispatch] = useReducer(reducer, initialState); 
 
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); 

  const {dataProjectMod, setDataProjectMod,openProject,setOpenProject} = useContext(DetailsPortfolioContext); 

  useEffect(() => {
    if(dataProjectMod!=null && openProject==true){
      dispatch({ type: 'updateState', payload: dataProjectMod});
    } 
  }, [openProject]);
  
  const handleClose = ()=>{
     dispatch({ type: 'reset' }); 
     setDataProjectMod(null);
     setOpenProject(false);
  };

   const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); 
   

      // const formData = new FormData();
          
      // formData.append('link', state.link);  
      // formData.append('name', state.name);  
      // formData.append('description', state.description);  
      // formData.append('achievements', state.achievements);  
      // formData.append('responsibilities', state.responsibilities);  
      // formData.append('skills', state.skills);  
      // formData.append('endDate', state.endDate);  
      // formData.append('startDate', state.startDate);  
      // formData.append('images', state.images);   
   
        if(dataProjectMod==null){  
          const response = await AddProject(state,previewImages); 
          dispatch({ type: 'reset' }); 
        }else{
          const response = await UpdateProject(formData);
          dispatch({ type: 'reset' }); 
        }
        handleClose(); 
        // window.location.reload(); 
  };

  // const handleImages = (newValue) => {
  //   setSelectedFiles(newValue);
  //   if (newValue.length>0) { ;
  //     array.forEach(element => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const result = reader.result;
  //         if (result && typeof result === 'string') {
  //           setPreviewImages((prevPreviewImages) => [...prevPreviewImages, result]);
  //         }
  //       };
  //     });
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreviewImages([]);
  //   }
  // } 
 
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFiles((selectedFile) => [...selectedFile, file]);
     if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result && typeof result === 'string') {
          setPreviewImages((prevPreviewImages) => [...prevPreviewImages, result]);
          // dispatch({ type: 'images', payload: [...previewImages, result] });  
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImages(null);
    } 
    
  };
  const handleDeleteImage = (indexToDelete:number) => {
    console.log(previewImages)
    const updatedPreviewImages = previewImages.filter((image, index) => index !== indexToDelete);
    setPreviewImages(updatedPreviewImages);
  };

  const handleChangeImages = (newValue) => { 
    console.log(newValue)
    setPreviewImages(newValue);
    // dispatch({ type: 'images', payload: newValue });  
   };

  return (
   
      <Modal
        open={openProject}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Card sx={style} >
      <CardHeader title={dataProjectMod== null ? 'Add Project' : 'Update Project'} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label='Project Name' 
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
                value={state.link}
                onChange={(e) => dispatch({ type: 'link', payload: e.target.value })}
                label='link' 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
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
                  onChange={(event ,newValue) => dispatch({ type: 'responsibilities', payload: newValue})}
                  value={state.responsibilities}
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
                 onChange={(event ,newValue) => dispatch({ type: 'achievements', payload: newValue})} 
                 value={state.achievements}
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
            <Grid item xs={12} spacing={2}  > 
                  <Autocomplete
                      multiple={true}
                      disableInput 
                      freeSolo
                      sx={{ display: 'flex', flexDirection: 'row' }}
                      value={previewImages}
                      onChange={(event, newValue) => handleChangeImages(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={index}
                            sx={{ width: '20%', height: '100px' }}
                            variant="outlined"
                            label={<img src={option} alt={`selectedFile-${index}`} style={{ maxWidth: '100%', maxHeight: '100px' }} />}
                            onDelete={() => handleDeleteImage(index)}  
                            deleteIcon={<CloseCircle />}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params} 
                          label="Images"
                          placeholder="Images..."
                        /> 
                      )}
                    />
                    <input
                      type="file"
                      accept="image/*" // You can restrict the file types here if needed
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="file-input"
                    />
                    <label htmlFor="file-input">
                      <Button variant="contained" component="span">
                        Choose File
                      </Button>
                    </label>
                

                </Grid>
                                {/* {selectedFiles?.length > 0 ? (
                    selectedFiles.map((file, index) => (
                      <Typography key={index} variant="body1" component="span" marginLeft={1}>
                        {file.name}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1" component="span" marginLeft={1}>
                      Select image
                    </Typography>
                  )} */}

               
                {/* {previewImages?.length > 0 && (
                  <Grid item xs={12}>
                    {previewImages?.map((previewImage, index) => (
                      <img
                        key={index}
                        src={previewImage}
                        alt={`selectedFile-${index}`}
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                      />
                    ))}
                  </Grid>
                )}
             */}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={state.description}
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
            <Button color="primary" variant="contained" type='submit'   size='large' disabled={previewImages.length==0} sx={{ marginRight: 2 }} >
              {dataProjectMod== null ? 'Save' : 'Update'}
              </Button>
              <Button    color="primary" variant="contained" onClick={()=>setOpenProject(false)}  sx={{ bgcolor: 'red', '&:hover': {backgroundColor: 'darkred'}}} size='large'>
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

export default AddEdit_ProjectModal;

 