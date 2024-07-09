import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  FormControl,
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
  Chip,
  InputAdornment,
  InputLabel
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { AccountOutline, Palette } from 'mdi-material-ui';

import {
  GetPortfolioById,
  ModifyPortfolio,
} from 'src/pages/api/PortfolioServices/Services';

import { GetCategoriesPortActive } from 'src/pages/api/CategoriePortServices/Service';
import { PortfolioContext } from 'src/@core/context/PortfolioContext';
import { getEducationAll } from '@api/EducationServices/Services';
import { getProjectAll } from '@api/ProjectServices/Services';
import { getExperienceAll } from '@api/ExperienceServices/Service';

interface ListState {
  educations: any[];
  experiences: any[];
  projects: any[];
}

const FormCreation = () => {
  const {
    modify,
    idPortfolio,
    setModify,
    setValue,
    setOpenPortCrea,
    setDataPortfolioCrea,
  } = useContext(PortfolioContext);

  const [dataPortfolioMod, setDataPortfolioMod] = useState<PortfolioData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [resume, setResume] = useState<string>('');
  const [list, setList] = useState<ListState>({
    educations: [],
    experiences: [],
    projects: [],
  });
  const [dataPortfolio, setDataPortfolio] = useState<PortfolioDataHelper>({
    categories: [],
    educations: [],
    experiences: [],
    projects: [],
    skills: [],
  });
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const [color, setColor] = useState<string>('#aabbcc');
  const [visi, setVisi] = useState<string>('Public');
  const [selectedCategorie, setSelectedCategorie] = useState<string>('');



  const resetStates = () => {
    setName('');
    setColor('#aabbcc');
    setVisi('Public');
    setSelectedCategorie('');
    setList({
      educations: [],
      experiences: [],
      projects: [],
    });
    setResume('');
    setDataPortfolioMod(null);
    setLoading(false);
    setError('');
    
  };
  

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
   
    async function GettingData() {
      try {
        const responseEducations = await getEducationAll();
        const responseProjects = await getProjectAll();
        const responseExperiences = await getExperienceAll();
        const responseCategories = await GetCategoriesPortActive();

        if (idPortfolio !== '') {
          setLoading(true);
          const data = await GetPortfolioById(idPortfolio);
          console.log(data)
          if (isMounted) {
            setDataPortfolioMod(data);
            setList({
              educations: data.educations,
              experiences: data.experiences,
              projects: data.projects,
            });
            setName(data.name);
            setColor(data.color);
            setVisi(data.visible ? 'Public' : 'Private');
            setSelectedCategorie(data.categorie ? data.categorie.id : '');
            setLoading(false);
          }
        }

        if (isMounted) {
          setDataPortfolio({
            educations: responseEducations,
            projects: responseProjects,
            experiences: responseExperiences,
            categories: responseCategories,
            skills: [],
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
  if(modify && !dataPortfolioMod) {
    return <>loading</>
  }
  const handleAddItem = (type: keyof ListState, value: string) => {
    if (!list[type].some((item) => item.id === value)) {
      let itemName = '';
      let newItem: Education | Experience | Project;

      switch (type) {
        case 'educations':
          const foundEducation = dataPortfolio.educations.find(
            (edu: Education) => edu.id === value
          );
          itemName = foundEducation ? foundEducation.institution : '';
          newItem = {
            id: value,
            institution: itemName,
          };
          break;
        case 'experiences':
          const foundExperience = dataPortfolio.experiences.find(
            (exp: Experience) => exp.id === value
          );
          itemName = foundExperience ? foundExperience.companyName : '';
          newItem = {
            id: value,
            companyName: itemName,
          };
          break;
        case 'projects':
          const foundProject = dataPortfolio.projects.find(
            (proj: Project) => proj.id === value
          );
          itemName = foundProject ? foundProject.name : '';
          newItem = {
            id: value,
            name: itemName,
          };
          break;
        default:
          return;
      }

      setList((prevState) => ({
        ...prevState,
        [type]: [...prevState[type], newItem],
      }));
    }
  };

  const handleDeleteItem = (type: keyof ListState, index: number) => {
    setList((prevState) => {
      const newList = [...prevState[type]];
      newList.splice(index, 1);
      return {
        ...prevState,
        [type]: newList,
      };
    });
  };

  const handleCreate = async () => {
    if (!name || !color || !selectedCategorie) {
      setError('Please enter all fields.');
      return;
    }

    try {
      setLoading(true);
      const payload: any = {
        selectedItems: {
          name: name,
          color: color,
          visible: visi === 'Public',
          educations: list.educations.map((edu) => ({ id: edu.id })),
          experiences: list.experiences.map((exp) => ({ id: exp.id })),
          projects: list.projects.map((proj) => ({ id: proj.id })),
          categorie: { id: selectedCategorie },
          resume: resume,
        },
      };

      const display: any = {
        selectedItems: {
          name: name,
          color: color,
          visible: visi,
          educations: list.educations.map((edu) => ({
            institution: edu.institution,
          })),
          experiences: list.experiences.map((exp) => ({
            companyName: exp.companyName,
          })),
          projects: list.projects.map((proj) => ({ name: proj.name })),
          categorie: { id: selectedCategorie },
          resume: resume
            ? "You've selected your resume"
            : 'No resume selected',
        },
      };

      let response: any = '';
      if (modify) {
        payload.selectedItems.id = dataPortfolioMod?.id;
        response = await ModifyPortfolio(payload.selectedItems);
        alert(`Portfolio modified: ${dataPortfolioMod?.id}`);
      } else {
        setOpenPortCrea(true);
        setDataPortfolioCrea({
          create: payload.selectedItems,
          display: display.selectedItems,
        });
      }
      if(modify) {
        setValue('view')
      }
      resetStates()
    } catch (error) {
      setLoading(false);
      setError('Error creating portfolio. Please try again later.');
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE_MB = 3;
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        alert(
          `Selected file exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} MB.`
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(',')[1];
        setResume(base64Data || '');
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={modify ? 'Modify Portfolio' : 'Create Portfolio'}
      />
      {error && <Typography color="error">{error}</Typography>}
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Leonard Carter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Experiences</InputLabel>
                <Select
                  label="Experiences"
                  value={''}
                  onChange={(event) =>
                    handleAddItem('experiences', event.target.value as string)
                  }
                >
                  {dataPortfolio.experiences &&
                    dataPortfolio.experiences.map((experience: Experience) => (
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
                  label="Projects"
                  value={''}
                  onChange={(event) =>
                    handleAddItem('projects', event.target.value as string)
                  }
                >
                  {dataPortfolio.projects &&
                    dataPortfolio.projects.map((project: Project) => (
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
                  label="Education"
                  value={''}
                  onChange={(event) =>
                    handleAddItem('educations', event.target.value as string)
                  }
                >
                  {dataPortfolio.educations &&
                    dataPortfolio.educations.map((education: Education) => (
                      <MenuItem key={education.id} value={education.id}>
                        {education.institution}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {['educations', 'experiences', 'projects'].map((type) => (
              <Grid item xs={12} key={type}>
                {list[type as keyof ListState].map(
                  (item: any, index: number) => (
                    <Chip
                      key={item.id}
                      label={
                        type === 'educations'
                          ? item.institution
                          : type === 'experiences'
                          ? item.companyName
                          : item.name
                      }
                      onDelete={() =>
                        handleDeleteItem(type as keyof ListState, index)
                      }
                      style={{ margin: '4px' }}
                    />
                  )
                )}
              </Grid>
            ))}


              <Grid item xs={12}>
                <Autocomplete
                  value={
                    dataPortfolio.categories.find((category) => category.id === selectedCategorie) || null
                  }
                  options={dataPortfolio.categories}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => setSelectedCategorie(newValue?.id || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categorie"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Visibility</InputLabel>
                <Select
                  label="Visibility"
                  value={visi}
                  onChange={(e) => setVisi(e.target.value)}
                >
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Pick your color</Typography>
              <HexColorPicker
                color={color}
                onChange={setColor}
                style={{ margin: '1rem 0' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                color={resume ? 'success' : 'primary'}
              >
                {resume ? 'Resume Selected' : 'Upload Resume'}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCreation;
