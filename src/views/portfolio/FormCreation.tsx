import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader, MenuItem, Select, TextField, Typography, CircularProgress } from '@mui/material';
import { Cross, Projector } from 'mdi-material-ui'
import InputLabel from '@mui/material/InputLabel';
import { CreatePortfolioPost } from 'src/pages/api/PortfolioServices/Services';
import { GetData } from 'src/pages/api/EducationServices/Services';
import { GetDataProjects } from 'src/pages/api/ProjectServices/Services';
import { GetDataExperience } from 'src/pages/api/ExperienceServices/Service';

interface Education {
  id: string;
  institution: string;
}

interface Experience {
  id: string;
  companyName: string;
}

interface Project {
  id: string;
  name: string;
}

interface PortfolioData {
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: string[]; 
}

interface ListState {
  educations: any[];
  experiences: any[];
  projects: any[];
}

const initialList: ListState = {
  educations: [],
  experiences: [],
  projects: []
};

const FormCreation = () => {
  const [list, setList] = useState<ListState>(initialList);
  const [dataPortfolio, setDataPortfolio] = useState<PortfolioData>({
    educations: [],
    experiences: [],
    projects: [],
    skills: []
  });
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    if (!name) {
      setError('Please enter a name.');
      return;
    }

    try {
      setLoading(true);
      console.log(list)
      const payload = {
        selectedItems: {
          educations: list.educations.map(edu => ({ id: edu.id })),
          experiences: list.experiences.map(exp => ({ id: exp.id })),
          projects: list.projects.map(proj => ({ id: proj.id }))
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
      setDataPortfolio({
        ...dataPortfolio,
        educations: responseEducations,
        projects: responseProjects,
        experiences: responseExperiences
      });
    }

    GettingData();
  }, []);

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h6' }} />
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
                error={!!error}
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
                  {dataPortfolio.experiences.map((experience: Experience) => (
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
                  {dataPortfolio.projects.map((project: Project) => (
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
                  {dataPortfolio.educations.map((education: Education) => (
                    <MenuItem key={education.id} value={education.id}>
                      {education.institution}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Render list items */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <List style={{ display: 'flex' }}>
                  {list.experiences.map((experience, index) => (
                    <li key={index} style={{ margin: '12px', backgroundColor: 'gray', padding: '4px', display: 'flex', alignItems: 'center' }}>
                      {experience?.name}
                      <Button onClick={() => handleDeleteItem('experiences', index)}>
                        <Cross />
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
                    <li key={index} style={{ margin: '12px', backgroundColor: 'gray', padding: '4px', display: 'flex', alignItems: 'center' }}>
                      {project.name}
                      <Button onClick={() => handleDeleteItem('projects', index)}>
                        <Cross />
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
                    <li key={index} style={{ margin: '12px', backgroundColor: 'gray', padding: '4px', display: 'flex', alignItems: 'center' }}>
                      {education.name}
                      <Button onClick={() => handleDeleteItem('educations', index)}>
                        <Cross />
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
