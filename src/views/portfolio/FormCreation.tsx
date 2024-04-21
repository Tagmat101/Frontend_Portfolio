import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader, MenuItem, Select, TextField, Typography, CircularProgress, Autocomplete, Chip } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { CreatePortfolioPost, ModifyPortfolio } from 'src/pages/api/PortfolioServices/Services';
import { getEducationAll } from 'src/pages/api/EducationServices/Services';
import { getProjectAll } from 'src/pages/api/ProjectServices/Services';
import { getExperienceAll } from 'src/pages/api/ExperienceServices/Service';
import { HexColorPicker } from 'react-colorful';
import {  GetCategoriesPortActive } from 'src/pages/api/CategoriePortServices/Service';
import { Categorie, Categories, Education, Experience, PortfolioDataHelper, Project } from 'src/utils/interfaces/int';
import { PortfolioContext } from 'src/@core/context/PortfolioContext';
import { PlusCircle } from 'mdi-material-ui';



interface ListState {
  educations: any[];
  experiences: any[];
  projects: any[];
}

const initialList: ListState = {
  educations: [],
  experiences: [],
  projects: [],
};

const FormCreation = () => {
  const {modify,dataPortfolioMod,setModify,setValue} = useContext(PortfolioContext)
  const [list, setList] = useState<ListState>({
    educations: modify ? dataPortfolioMod.educations : [],
    experiences: modify ? dataPortfolioMod.experiences : [],
    projects: modify ? dataPortfolioMod.projects : []
  });
  const [dataPortfolio, setDataPortfolio] = useState<PortfolioDataHelper>({
    categories: [],
    educations: [],
    experiences: [],
    projects: [],
    skills: [],
  });
  const [name, setName] = useState(modify ? dataPortfolioMod.name : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [color, setColor] = useState(modify ? dataPortfolioMod.color : '#aabbcc');
  
  const [selectedCategorie, setSelectedCategorie] = useState<string>(modify ? (dataPortfolioMod.categorie != null ?  dataPortfolioMod.categorie.id : "" ) : "");

  const handleAddItem = (type: keyof ListState, value: string) => {
    if (!list[type].some(item => item.id === value)) {
      let itemName = '';
      let newItem: Education | Experience | Project; 
  
      switch (type) {
        case 'educations':
          const foundEducation = dataPortfolio.educations.find(edu => edu.id === value);
          itemName = foundEducation ? foundEducation.institution : '';
          newItem = {
            id: value,
            institution: itemName,
          };
          break;
        case 'experiences':
          const foundExperience = dataPortfolio.experiences.find(exp => exp.id === value);
          itemName = foundExperience ? foundExperience.companyName : '';
          newItem = {
            id: value,
            companyName: itemName,
          };
          break;
        case 'projects':
          const foundProject = dataPortfolio.projects.find(proj => proj.id === value);
          itemName = foundProject ? foundProject.name : '';
          newItem = {
            id: value,
            name: itemName,
          };
          break;
        default:
          break;
      }
  
      setList(prevState => ({
        ...prevState,
        [type]: [...prevState[type], newItem]
      }));
    }
  };
  
  
  const handleDeleteItem = (type: keyof ListState, index: number) => {
    setList(prevState => {
      const newList = [...prevState[type]];
      newList.splice(index, 1);
      return {
        ...prevState,
        [type]: newList
      };
    });
  };

  const handleCreate = async () => {
    //|| list.educations.length == 0 || list.projects.length == 0 || list.experiences.length == 0
    if (!name || !color || !selectedCategorie) {
      setError('Please enter fields.');
      return;
    }

    try {
      setLoading(true);
      const payload:any = {
        selectedItems: {
          name: name,
          color: color,
          educations: list.educations.map(edu => ({ id: edu.id })),
          experiences: list.experiences.map(exp => ({ id: exp.id })),
          projects: list.projects.map(proj => ({ id: proj.id })),
          categorie: {id: selectedCategorie}
        }
      };

      let response:any = "";
      //adding the id if it is a modified one : 
      if(modify) {
        payload.selectedItems.id = dataPortfolioMod.id;
        response = ModifyPortfolio(payload.selectedItems)

      } else response = await CreatePortfolioPost(payload.selectedItems);

      if(modify) {
        setModify(false)
        setValue('view')
      }
      setLoading(false);
      alert(`Portfolio : ${modify ? "modified" + dataPortfolioMod.id : "Created" + response.id}`);
    } catch (error) {
      setLoading(false);
      setError('Error creating portfolio. Please try again later.');
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
  
    async function GettingData() {
      try {
        const responseEducations = await getEducationAll();
        const responseProjects = await getProjectAll();
        const responseExperiences = await getExperienceAll();
        const responseCategories = await GetCategoriesPortActive();
        
        if (isMounted) {
          setDataPortfolio({
            ...dataPortfolio,
            educations: responseEducations,
            projects: responseProjects,
            experiences: responseExperiences,
            categories: responseCategories
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    GettingData();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h6' }} title={modify ? "Modify portfolio" : "Create portfolio"} />
      {error != "" && <div>{error}</div>}
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                placeholder='Leonard Carter'
                value={name}
                onChange={e => setName(e.target.value)}
                helperText={error}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Experiences</InputLabel>
                <Select
                  label='Experiences'
                  value={''}
                  onChange={(event) => handleAddItem('experiences', event.target.value as string)}
                >
                  {dataPortfolio.experiences && dataPortfolio.experiences.map((experience: Experience) => (
                    <MenuItem key={experience.id} value={experience.id}>
                      {experience.companyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Projects</InputLabel>
                <Select
                  label='Projects'
                  value={''} 
                  onChange={(event) => handleAddItem('projects', event.target.value as string)}
                >
                  {dataPortfolio.projects && dataPortfolio.projects.map((project: Project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Education</InputLabel>
                <Select
                  label='Education'
                  value={''} 
                  onChange={(event) => handleAddItem('educations', event.target.value as string)}
                >
                  {dataPortfolio.educations && dataPortfolio.educations.map((education: Education) => (
                    <MenuItem key={education.id} value={education.id}>
                      {education.institution}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Categories</InputLabel>
                <Select
                  label='Categories'
                  value={selectedCategorie} 
                  onChange={(event: any) => setSelectedCategorie(event.target.value as string)}
                >
                  {dataPortfolio.categories && dataPortfolio.categories.map((categorie: Categorie) => (
                    <MenuItem key={categorie.id} value={categorie.id}>
                      {categorie.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label='Color'
                  placeholder='Pick a color'
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  disabled={true}
                />
              <HexColorPicker color={color} onChange={setColor} />
            </Grid>

            {/* Render list items */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={[]} 
                value={list.projects}
                onChange={(event, newValue) => {
                  setList(prevState => ({
                    ...prevState,
                    projects: newValue
                  }));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.name}
                     
                      {...getTagProps({ index })}
                    />
                  ))
                } 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Projects"
                    placeholder="Projects..."
                  />
                )}
              />   
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={[]} 
                value={list.educations}
                onChange={(event, newValue) => {
                  setList(prevState => ({
                    ...prevState,
                    educations: newValue
                  }));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.institution}
                     
                      {...getTagProps({ index })}
                    />
                  ))
                } 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Educations"
                    placeholder="Educations..."
                  />
                )}
              />   
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={[]} 
                value={list.experiences}
                onChange={(event, newValue) => {
                  setList(prevState => ({
                    ...prevState,
                    experiences: newValue
                  }));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.companyName}
                     
                      {...getTagProps({ index })}
                    />
                  ))
                } 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Experiences"
                    placeholder="Experiences..."
                  />
                )}
              />   
            </Grid>



            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' onClick={handleCreate}>
                {loading ? <CircularProgress size={24} /> : <>
                  {
                    modify ? 'Modify Portfolio' : 'Create Portfolio'
                  }
                </>}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCreation;
