import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader} from '@mui/material';
import CategorieModal from '../Modals/PortfolioModals/CategorieModal';
import CategoriesPortTable from '../tables/CategoriesPortTable';
import { CategorieContext } from 'src/@core/context/CategorieContext';

const FormCreation = () => {

  const [openModal,setOpenModal] = useState(false)
  const {setModify,setDataCategorieMod} = useContext(CategorieContext)
  const handleCreate = async () => {
     setDataCategorieMod({id: '',name: '',state: false})
     setOpenModal(true)
     setModify(false)
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
