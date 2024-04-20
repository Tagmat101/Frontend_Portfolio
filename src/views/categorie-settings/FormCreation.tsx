import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader} from '@mui/material';
import CategoriesPortTable from '../tables/CategoriesPortTable';
import { CategorieContext } from 'src/@core/context/CategorieContext';

const FormCreation = () => {

  const {setModify,setDataCategorieMod , setOpenCatModal} = useContext(CategorieContext)
  const handleCreate = async () => {
     setOpenCatModal(true)
     setDataCategorieMod({id: '',name: '',state: false})
     setModify(false)
  };

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Button type='submit' variant='contained' style={{marginBottom: '20px'}} color='info' size='large' onClick={handleCreate}>
            Add categorie
        </Button>
        <CategoriesPortTable /> 
      </CardContent>
    </Card>
  );
};

export default FormCreation;
