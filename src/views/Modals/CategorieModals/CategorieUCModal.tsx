{/* Modal for creation and update */}

import React, { useReducer, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CreateCategoriePort, UpdateCategoriePort } from 'src/pages/api/CategoriePortServices/Service';
import { CategorieContext } from 'src/@core/context/CategorieContext';
import { Categorie, CategorieHelper } from 'src/utils/interfaces/int';

interface State {
  categoryName: string;
  categoryState: 'active' | 'inactive';
}

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_STATE'; payload: 'active' | 'inactive' }
  | { type: 'RESET' };

const initialState: State = {
  categoryName: '',
  categoryState: 'active',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, categoryName: action.payload };
    case 'SET_STATE':
      return { ...state, categoryState: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CategorieUCModal = () => {
  const { modify,setModify, dataCategorieMod , setDataCategorieMod , openCatModal , setOpenCatModal} = useContext(CategorieContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorMessage,setErrorMessage] = useState('')
  console.log(openCatModal)
  useEffect(() => {
    if (modify) {
      dispatch({ type: 'SET_NAME', payload: dataCategorieMod.name });
      dispatch({ type: 'SET_STATE', payload: dataCategorieMod.state ? 'active' : 'inactive' });
    }
  }, [modify, dataCategorieMod]);


  const handleClose = () => {
    dispatch({ type: 'RESET' });
    setOpenCatModal(false);
    setDataCategorieMod({id: '',name: '',state: false})
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try
    {
      event.preventDefault();
      const { categoryName, categoryState } = state;
      if (categoryName.trim() !== '') {
      
        if (modify) { 
          const category:Categorie = {
            id: dataCategorieMod.id,
            name: categoryName,
            state: categoryState === 'active' ? true : false,
          };
          console.log(category)
          await UpdateCategoriePort(category);
          document.location.reload()
          setModify(false)
        } else {
          const categoryObject:CategorieHelper = {
            name: categoryName,
            state: categoryState === 'active' ? true : false,
          };
    
          await CreateCategoriePort(categoryObject);
          document.location.reload()
        }
        dispatch({ type: 'RESET' });
        handleClose();
      }
    } catch(error:any)
    {
      setErrorMessage(error.response.data.message)
    }
    setTimeout(() => {
      setErrorMessage('');
    }, 1000);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  };

  const handleChangeState = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch({ type: 'SET_STATE', payload: e.target.value as 'active' | 'inactive' });
  };

  return (
    <div>
      <Modal
        open={openCatModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modify ? 'Modify Category' : 'Add Category'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Category Name"
              variant="outlined"
              margin="normal"
              value={state.categoryName}
              onChange={handleChangeName}
            />
            <TextField
              select
              fullWidth
              label="Category State"
              variant="outlined"
              margin="normal"
              value={state.categoryState}
              onChange={handleChangeState}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary">
              {modify ? 'Modify' : 'Add'}
            </Button>
           <p>{errorMessage}</p>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CategorieUCModal;
