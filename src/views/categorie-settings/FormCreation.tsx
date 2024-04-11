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
import CategorieModal from '../Modals/PortfolioModals/CategorieModal';
import CategoriesPortTable from '../tables/CategoriesPortTable';

const FormCreation = () => {

  const [openModal,setOpenModal] = useState(false)

  const handleCreate = async () => {
     setOpenModal(true)
  };

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Button type='submit' variant='contained' style={{marginBottom: '5px'}} size='large' onClick={handleCreate}>
            Add categorie
        </Button>
        <CategoriesPortTable />
      </CardContent>
      <CategorieModal open={openModal} setOpen={setOpenModal}/>
    </Card>
  );
};

export default FormCreation;
