import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader, MenuItem, Select, TextField, Typography, CircularProgress } from '@mui/material';
import { Cross, Projector, TrashCan } from 'mdi-material-ui'
import InputLabel from '@mui/material/InputLabel';
import { CreatePortfolioPost } from 'src/pages/api/PortfolioServices/Services';
import { GetData } from 'src/pages/api/EducationServices/Services';
import { GetDataProjects } from 'src/pages/api/ProjectServices/Services';
import { GetDataExperience } from 'src/pages/api/ExperienceServices/Service';
import { HexColorPicker } from 'react-colorful';
import { GetCategoriesPort } from 'src/pages/api/CategoriePortServices/Service';
import { Categorie, Categories, Education, Experience, PortfolioData, PortfolioDataHelper, Project } from 'src/utils/interfaces/int';



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
  const [list, setList] = useState<ListState>(initialList);
  const [dataPortfolio, setDataPortfolio] = useState<PortfolioDataHelper>({
    categories: [],
    educations: [],
    experiences: [],
    projects: [],
    skills: [],
  });
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [color, setColor] = useState("#aabbcc");
  
  const [selectedCategorie, setSelectedCategorie] = useState<string>('');

  const handleAddItem = (type: keyof ListState, value: string) => {
    if (!list[type].some(item => item.id === value)) {
      let itemName = '';
      switch (type) {
        case 'educations':
          const foundEducation = dataPortfolio.educations.find(edu => edu.id === value);
          itemName = foundEducation ? foundEducation.institution : '';
          break;
        case 'experiences':
          const foundExperience = dataPortfolio.experiences.find(exp => exp.id === value);
          itemName = foundExperience ? foundExperience.companyName : '';
          break;
        case 'projects':
          const foundProject = dataPortfolio.projects.find(proj => proj.id === value);
          itemName = foundProject ? foundProject.name : '';
          break;
        default:
          break;
      }
  
      const newItem = {
        id: value,
        name: itemName,
      };
  
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
    if (!name || !color || list.educations.length == 0 || list.projects.length == 0 || list.experiences.length == 0 ) {
      setError('Please enter fields.');
      return;
    }

    try {
      setLoading(true);
      console.log(list)
      const payload = {
        selectedItems: {
          name: name,
          color: color,
          educations: list.educations.map(edu => ({ id: edu.id })),
          experiences: list.experiences.map(exp => ({ id: exp.id })),
          projects: list.projects.map(proj => ({ id: proj.id })),
          categorie: {id: selectedCategorie}
        }
      };
      const response = await CreatePortfolioPost(payload.selectedItems);
      setLoading(false);
      alert('Portfolio created: ' + response.id);
      console.log(response);
    } catch (error) {
      setLoading(false);
      setError('Error creating portfolio. Please try again later.');
      console.error(error);
    }
  };

  useEffect(() => {
    async function GettingData() {
      const responseEducations = await GetData();
      const responseProjects = await GetDataProjects();
      const responseExperiences = await GetDataExperience();
      const responseCategories = await GetCategoriesPort();
      setDataPortfolio({
        ...dataPortfolio,
        educations: responseEducations,
        projects: responseProjects,
        experiences: responseExperiences,
        categories: responseCategories
      });
      
    }
      
    GettingData();
  }, []);

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h6' }} color='red' title={error} />
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
              <FormControl fullWidth>
                <List style={{ display: 'flex' }}>
                  {list.experiences.map((experience, index) => (
                    <li key={index} style={{ margin: '12px',borderRadius: '10px', backgroundColor: '#F4F5FA', padding: '2px', display: 'flex', alignItems: 'center' }}>
                      {experience?.name}
                      <Button onClick={() => handleDeleteItem('experiences', index)}>
                        <TrashCan />
                      </Button>
                    </li>
                  ))}
                </List>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <List style={{ display: 'flex' }}>
                  {list.projects.map((project, index) => (
                    <li key={index} style={{ margin: '12px',borderRadius: '10px', backgroundColor: '#F4F5FA', padding: '2px', display: 'flex', alignItems: 'center' }}>                      {project.name}
                      <Button onClick={() => handleDeleteItem('projects', index)}>
                        <TrashCan />
                      </Button>
                    </li>
                  ))}
                </List>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <List style={{ display: 'flex' }}>
                  {list.educations.map((education, index) => (
                    <li key={index} style={{ margin: '12px',borderRadius: '10px', backgroundColor: '#F4F5FA', padding: '2px', display: 'flex', alignItems: 'center' }}>                      {education.name}
                      <Button onClick={() => handleDeleteItem('educations', index)}>
                        <TrashCan />
                      </Button>
                    </li>
                  ))}
                </List>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' onClick={handleCreate}>
                {loading ? <CircularProgress size={24} /> : 'Create Portfolio'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCreation;
